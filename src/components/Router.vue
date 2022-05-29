<template>
  <component :is="currentView" />
</template>

<script setup lang="ts">
import Home from './Home.vue';
import Gallery from './gallery/Gallery.vue';
import NotFound from './NotFound.vue';

import {computed, ref} from "vue";

const routes = {
  '/': Home,
  '/gallery': Gallery,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound;
});

</script>

<style scoped>

</style>