<template>
  <component :is="currentView"/>
</template>

<script setup lang="ts">
import Home from './Home.vue';
import ActiveDevelopment from './ActiveDevelopment.vue';
import NotFound from './NotFound.vue';

import {computed, ref} from "vue";
import {routePath} from "./routePath";

const routes: any = {
  '/': Home,
  '/gallery': ActiveDevelopment,
};

const currentView = computed(() => {
  // if (routePath.value.startsWith('/image')) return Gallery;
  return routes[routePath.value || '/'] || NotFound;
});

</script>

<style scoped>

</style>