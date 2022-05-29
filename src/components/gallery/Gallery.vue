<template>
  <div class="container" ref="container">
    <LazyImage v-for="(url, idx) in urls" :source="url" :index="idx" :current-index="currentIndex"></LazyImage>
  </div>
</template>

<script setup lang="ts">
import LazyImage from './LazyImage.vue';
import * as Hammer from 'hammerjs';

import imgUrl1 from '../../assets/_DSC0335.jpg';
import imgUrl2 from '../../assets/_DSC0695.jpg';
import imgUrl3 from '../../assets/DSC06519.jpg';
import imgUrl4 from '../../assets/DSC07406.jpg';
import imgUrl5 from '../../assets/DSC07461.jpg';
import imgUrl6 from '../../assets/DSC07677.jpg';
import {onMounted, ref} from "vue";

const urls = [
  imgUrl1,
  imgUrl2,
  imgUrl3,
  imgUrl4,
  imgUrl5,
  imgUrl6,
];

let currentIndex = ref(0);
const container = ref<HTMLElement>();


function nextImage() {
  if (currentIndex.value < urls.length - 1) currentIndex.value++;
}

function prevImage() {
  if (currentIndex.value > 0) currentIndex.value--;
}

let hammertime;
onMounted(() => {
  hammertime = new Hammer((container.value as HTMLElement), {});
  hammertime.on("swipeleft", () => {
    nextImage();
  });
  hammertime.on("swiperight", () => {
    prevImage();
  });
});

</script>

<style scoped>
.container {
  position: fixed;

  height: 100%;
  width: 100%;

  background: var(--bg-color);

  user-select: none;
}
</style>