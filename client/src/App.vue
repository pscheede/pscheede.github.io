<script setup lang="ts">
import Router from './components/Router.vue';
</script>

<template>
  <Router/>
</template>

<style>
@font-face {
  font-family: 'Comfortaa';
  src: url('@/assets/fonts/Comfortaa-Light.ttf');
  font-weight: 300;
}

@font-face {
  font-family: 'Comfortaa';
  src: url('@/assets/fonts/Comfortaa-Regular.ttf');
  font-weight: 400;
}

@font-face {
  font-family: 'Comfortaa';
  src: url('@/assets/fonts/Comfortaa-Medium.ttf');
  font-weight: 500;
}

@font-face {
  font-family: 'Comfortaa';
  src: url('@/assets/fonts/Comfortaa-SemiBold.ttf');
  font-weight: 600;
}

@font-face {
  font-family: 'Comfortaa';
  src: url('@/assets/fonts/Comfortaa-Bold.ttf');
  font-weight: 700;
}

#app {
  font-family: 'Comfortaa', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
