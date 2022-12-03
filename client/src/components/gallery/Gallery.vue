<script setup lang="ts">
import LazyImage from './LazyImage.vue';
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import Header from "../Navigation/Header.vue";
import {useRoute, useRouter} from "vue-router";

interface Image {
  url: string;
  filename: string;
  sizes: { [key: string]: { url: string, width: number } };
}

const route = useRoute();
const router = useRouter();

function getSizes(img: Image): { [key: number]: string } {
  return Object.fromEntries(Object.entries(img.sizes).map(([, {url, width}]) => [width, url]));
}

let images = ref<Image[]>([]);

const NONE_SELECTED = -5;

const currentIdx = computed(() => {
  const newIndex = images.value.map((img) => img.filename).indexOf((route.params.img as string));
  return newIndex !== -1 ? newIndex : NONE_SELECTED;
})
const isLarge = computed(() => currentIdx.value !== NONE_SELECTED);

watch(currentIdx, (newVal) => {
  if (newVal === NONE_SELECTED && route.params.img) {
    router.replace('/gallery');
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

  router.replace(`/image/${images.value.at(currentIdx.value + 1)!.filename}/show`);
}

function prevImage() {
  if (!hasPrevImage()) return;

  router.replace(`/image/${images.value.at(currentIdx.value - 1)!.filename}/show`);
}

function closeImage() {
  if (openedFromGallery) {
    history.back();
  } else {
    openedFromGallery = true;
    router.replace(`/gallery`);
  }
}

// http://localhost:3000/#/image/_DSC1652.jpg


let openedFromGallery = true;

onMounted(async () => {
  const req = await fetch(`${import.meta.env.VITE_API_URL}/api/images?sort=-updatedAt`);
  const json: { docs: Image[] } = await req.json();

  images.value = json.docs

  if (route.params.img) {
    openedFromGallery = false;

    if (currentIdx.value === NONE_SELECTED) {
      await router.replace('/gallery');
    }
  }
});

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
  }, 1500);
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
    <Header v-if="!isLarge"></Header>
    <div v-show="!isLarge" class="overview">
      <router-link v-for="(img) in images" :to="`/image/${ img.filename }/show`">
        <img :src="img.sizes.thumbnail.url" alt="">
      </router-link>
    </div>
    <div v-show="isLarge" class="container lazy-image-background" @mousemove="mouseMove">
      <LazyImage v-for="(img, idx) in images" :source="img.url" :index="idx" :current-index="currentIdx"
                 :sizes="getSizes(img)" @next="nextImage" @prev="prevImage"></LazyImage>
      <div :class="{ show : showControls && hasPrevImage(), control: true }" @click="prevImage" id="left" ref="leftRef">&lt;</div>
      <div :class="{ show : showControls && hasNextImage(), control: true }" @click="nextImage" id="right" ref="rightRef">&gt;</div>
      <div :class="{ show : showControls, control: true }" @click="closeImage" id="close" ref="closeRef">x</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
      visibility: visible;
      opacity: 1;

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
