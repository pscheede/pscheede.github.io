<script setup lang="ts">
import Header from "@/components/Navigation/Header.vue";
import MyFooter from "@/components/Navigation/MyFooter.vue";
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="app">
    <Header v-if="!route.meta.disableHeader" />
    <div class="content">
      <router-view/>
    </div>
    <MyFooter v-if="!route.meta.disableFooter" />
  </div>
</template>

<style>
#app {
  font-family: 'Comfortaa', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  position: relative;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

.footer-host {
  margin-top: auto;
}
</style>
