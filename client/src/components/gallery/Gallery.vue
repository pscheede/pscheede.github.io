<template>
  <div v-show="!large" class="overview">
    <a v-for="(img, idx) in images" :href="`#/image/${ img.filename }`">
      <img :src="img.sizes.thumbnail.url" alt="">
    </a>
  </div>
  <div v-show="large" class="container" ref="container">
    <LazyImage v-for="(img, idx) in images" :source="img.url" :index="idx" :current-index="currentIndex"></LazyImage>
  </div>
</template>

<script setup lang="ts">
import LazyImage from './LazyImage.vue';
import Hammer from 'hammerjs';
import {onMounted, ref, watch} from "vue";
import {routePath} from "../routePath";

interface Image {
  url: string;
  filename: string;
  sizes: { thumbnail: { url: string } };
}

let large = ref<boolean>(false);

// let urls = computed<string[]>(() => images.value.map((img) => {
//   console.log(img.url);
//   return img.url;
// }));

let images = ref<Image[]>([]);

let currentIndex = ref(-5);
const container = ref<HTMLElement>();

function nextImage() {
  if (currentIndex.value >= images.value.length - 1) return;

  currentIndex.value++;
  setQueryString();
}

function prevImage() {
  if (currentIndex.value <= 0) return;

  currentIndex.value--;
  setQueryString();
}

function setQueryString() {
  const currentImg = images.value.at(currentIndex.value);

  const newUrl = new URL(window.location.href);
  if (currentImg === undefined) {
    newUrl.hash = '/gallery';
  } else {
    newUrl.hash = `/image/${currentImg.filename}`
  }
  window.history.replaceState(null, '', newUrl.href)
}

async function setLargeView(newPath: string) {
  if (newPath.startsWith('/image')) {
    const filename = newPath.split('/').pop()!;
    const newIndex = images.value.map((img) => img.filename).indexOf(filename);
    if (newIndex !== -1) {
      currentIndex.value = newIndex;
      large.value = true;
    } else {
      currentIndex.value = -5;
      large.value = false;
      setQueryString();
    }
  } else {
    large.value = false;
    currentIndex.value = -5;
  }
}

watch(routePath, setLargeView);

let hammertime;
onMounted(async () => {
  hammertime = new Hammer((container.value as HTMLElement), {});
  hammertime.on("swipeleft", () => {
    nextImage();
  });
  hammertime.on("swiperight", () => {
    prevImage();
  });

  const req = await fetch(`${import.meta.env.VITE_API_URL}/api/images?sort=-updatedAt`);
  const json: { docs: Image[] } = await req.json();

  images.value = json.docs

  await setLargeView(routePath.value);
});

</script>

<style scoped>

.overview {
  padding: 1rem;

  display: grid;
  /*flex-flow: row wrap;*/

  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  /*grid-auto-columns: minmax(200px, 300px);*/
  grid-auto-rows: minmax(140px, auto);
  grid-auto-flow: row;

  gap: 1rem;

  min-height: 100%;
  width: 100%;
}

@media only screen and (min-width: 576px) {
  .overview {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-auto-rows: minmax(150px, auto);
  }
}


.overview a {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  flex-basis: 200px;
  flex-grow: 1;
}

.overview img {
  max-width: 100%;
  max-height: 100%;

  box-shadow: 5px 5px 50px -20px #000a;
}

.container {
  position: fixed;

  height: 100%;
  width: 100%;

  user-select: none;
}
</style>