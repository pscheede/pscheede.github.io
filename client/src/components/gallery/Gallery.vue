<template>
  <div v-show="!large" class="overview">
    <a v-for="(img) in images" :href="`#/image/${ img.filename }`">
      <img :src="img.sizes.thumbnail.url" alt="">
    </a>
  </div>
  <div v-show="large" class="container" ref="container">
    <LazyImage v-for="(img, idx) in images" :source="img.url" :index="idx" :current-index="currentIndex"
               :sizes="getSizes(img)"></LazyImage>
    <div :class="{ show : showControls && hasPrevImage(), control: true }" @click="prevImage" id="left">&lt;</div>
    <div :class="{ show : showControls && hasNextImage(), control: true }" @click="nextImage" id="right">&gt;</div>
    <div :class="{ show : showControls, control: true }" @click="closeImage" id="close">x</div>
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
  sizes: { [key: string]: { url: string, width: number } };
}

function getSizes(img: Image): { [key: number]: string } {
  return Object.fromEntries(Object.entries(img.sizes).map(([, {url, width}]) => [width, url]));
}

let large = ref<boolean>(false);

let images = ref<Image[]>([]);

let currentIndex = ref(-5);
const container = ref<HTMLElement>();

function hasNextImage() {
  return currentIndex.value < images.value.length - 1;
}

function hasPrevImage() {
  return currentIndex.value > 0;
}

function nextImage() {
  if (!hasNextImage()) return;

  currentIndex.value++;
  setQueryString();
}

function prevImage() {
  if (!hasPrevImage()) return;

  currentIndex.value--;
  setQueryString();
}

function closeImage() {
  if (openedFromGallery) {
    history.back();
  } else {
    currentIndex.value = -5;
    large.value = false;
    setQueryString();
  }
}

// http://localhost:3000/#/image/_DSC1652.jpg

function setQueryString() {

  const newUrl = new URL(window.location.href);
  if (currentIndex.value < 0) {
    newUrl.hash = '/gallery';
  } else {
    const currentImg = images.value.at(currentIndex.value)!;
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

let openedFromGallery = true;

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

  if (large.value) {
    openedFromGallery = false;
  }

  container.value?.addEventListener('mousemove', async () => {
    showControls.value = true;
    startHideControls();
  });
});

let showControls = ref(false);
let timeout: number;

function startHideControls() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    showControls.value = false;
  }, 1500);
}

</script>

<style scoped>

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
}

@media only screen and (min-width: 500px) {
  .overview {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media only screen and (min-width: 700px) {
  .overview {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }
}


@media only screen and (min-width: 992px) {
  .overview {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  }
}

@media only screen and (min-width: 1600px) {
  .overview {
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
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

.container .control {
  line-height: .5;
  font-size: 5rem;
  color: rgba(255, 255, 255, .6);
  cursor: pointer;

  text-shadow: 1px 1px 20px #000;

  transition: visibility 0ms 200ms, opacity 200ms linear 0ms;

  visibility: hidden;
  opacity: 0;
}

.container .control.show {
  visibility: visible;
  opacity: 1;

  transition: visibility 0ms 0ms, opacity 200ms linear 0ms;
}

.container .control:hover {
  color: rgba(255, 255, 255, .9);
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
</style>
