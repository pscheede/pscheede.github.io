<script lang="ts" setup>
import LazyImage from './LazyImage.vue';
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {AlbumImage, getImagesForAlbum} from "@/components/service/api";

interface Props {
  albumSlug: string;
  img?: string;
}

const props = withDefaults(defineProps<Props>(), {
  img: undefined
});

const router = useRouter();

const images = ref<AlbumImage[]>([]);

let openedFromGallery = true;

onMounted(async () => {
  images.value = await getImagesForAlbum(props.albumSlug as string);

  if (props.img) {
    openedFromGallery = false;

    if (currentIdx.value === NONE_SELECTED) {
      await router.replace({name: 'gallery', params: {albumSlug: props.albumSlug}});
    }
  }
});

const NONE_SELECTED = -5;

const currentIdx = computed(() => {
  const newIndex = images.value.map((img) => img.filename).indexOf((props.img as string));
  return newIndex !== -1 ? newIndex : NONE_SELECTED;
})
const isLarge = computed(() => currentIdx.value !== NONE_SELECTED);

watch(currentIdx, (newVal) => {
  if (newVal === NONE_SELECTED && props.img) {
    router.replace({name: 'gallery', params: {albumSlug: props.albumSlug}});
  }
});

function hasNextImage() {
  return currentIdx.value < images.value.length - 1;
}

function hasPrevImage() {
  return currentIdx.value > 0;
}

function nextImage() {
  if (!hasNextImage()) return;

  const newImage = images.value.at(currentIdx.value + 1)!.filename;
  router.replace({name: 'gallery-image', params: {albumSlug: props.albumSlug, img: newImage}});
}

function prevImage() {
  if (!hasPrevImage()) return;

  const newImage = images.value.at(currentIdx.value - 1)!.filename;
  router.replace({name: 'gallery-image', params: {albumSlug: props.albumSlug, img: newImage}});
}

function closeImage() {
  if (openedFromGallery) {
    router.back();
  } else {
    openedFromGallery = true;
    router.replace({name: 'gallery', params: {albumSlug: props.albumSlug}});
  }
}

let showControls = ref(true);
let timeout: number;

let stopFlag = false;

function mouseMove() {
  showControls.value = true;
  startHideControls();
}

function startHideControls() {
  clearTimeout(timeout);

  if (stopFlag) return;

  timeout = setTimeout(() => {
    showControls.value = false;
  }, 1000);
}

const rightRef = ref<HTMLDivElement>();
const leftRef = ref<HTMLDivElement>();
const closeRef = ref<HTMLDivElement>();

onMounted(() => {
  startHideControls();

  rightRef.value?.addEventListener('pointerenter', enter);
  leftRef.value?.addEventListener('pointerenter', enter);
  closeRef.value?.addEventListener('pointerenter', enter);

  rightRef.value?.addEventListener('pointerleave', leave);
  leftRef.value?.addEventListener('pointerleave', leave);
  closeRef.value?.addEventListener('pointerleave', leave);
});

onBeforeUnmount(() => {
  rightRef.value?.removeEventListener('pointerenter', enter);
  leftRef.value?.removeEventListener('pointerenter', enter);
  closeRef.value?.removeEventListener('pointerenter', enter);

  rightRef.value?.removeEventListener('pointerleave', leave);
  leftRef.value?.removeEventListener('pointerleave', leave);
  closeRef.value?.removeEventListener('pointerleave', leave);
});

function enter() {
  clearTimeout(timeout);
  stopFlag = true;
}

function leave() {
  startHideControls();
  stopFlag = false;
}
</script>

<template>
  <div class="gallery-host">
    <div v-show="!isLarge" class="overview">
      <router-link v-for="(img) in images"
                   :to="{ name: 'gallery-image', params: { albumSlug: props.albumSlug, img: img.filename } }">
        <img :src="img.thumbnailUrl" alt="">
      </router-link>
    </div>
    <div v-show="isLarge" class="container lazy-image-background" @mousemove="mouseMove">
      <LazyImage v-for="(img, idx) in images" :current-index="currentIdx" :index="idx" :sizes="img.sizes"
                 :source="img.url" @next="nextImage" @prev="prevImage"></LazyImage>
      <div id="left" ref="leftRef" :class="{ show : showControls && hasPrevImage(), control: true }" @click="prevImage">
        &lt;
      </div>
      <div id="right" ref="rightRef" :class="{ show : showControls && hasNextImage(), control: true }"
           @click="nextImage">&gt;
      </div>
      <div id="close" ref="closeRef" :class="{ show : showControls, control: true }" @click="closeImage">x</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overview {
  padding: 1rem;

  display: grid;
  /*flex-flow: row wrap;*/

  align-items: center;

  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  /*grid-auto-columns: minmax(200px, 300px);*/
  grid-auto-rows: minmax(100px, auto);
  grid-auto-flow: row;

  gap: 1rem;

  min-height: 100%;
  width: 100%;

  @media only screen and (min-width: 500px) {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media only screen and (min-width: 700px) {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }


  @media only screen and (min-width: 992px) {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  }

  @media only screen and (min-width: 1600px) {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  img {
    max-width: 100%;
    max-height: 100%;

    box-shadow: 5px 5px 50px -20px #000a;
  }
}

.container {
  position: fixed;

  height: 100%;
  width: 100%;

  user-select: none;

  .control {
    line-height: .5;
    font-size: 5rem;
    color: rgba(255, 255, 255, .6);
    cursor: pointer;

    text-shadow: 1px 1px 20px #000;

    transition: visibility 0ms 200ms, opacity 200ms linear 0ms;

    visibility: hidden;
    opacity: 0;

    &.show {
      @media (hover: hover) and (pointer: fine) {
        visibility: visible;
        opacity: 1;
      }

      transition: visibility 0ms 0ms, opacity 200ms linear 0ms;
    }

    &:hover {
      color: rgba(255, 255, 255, .9);
    }
  }
}

#left {
  position: fixed;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

#right {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

#close {
  font-size: 3rem;
  position: fixed;
  right: 1rem;
  top: 1rem;
}

.lazy-image-background {
  background-color: #131718;
}
</style>
