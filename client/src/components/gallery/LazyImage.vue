<template>
  <div class="container"><img :src="_source" alt="" v-on:dragstart.prevent=""></div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{ source: string, index: number, currentIndex: number }>();
const alignment = computed(
    () => props.currentIndex === props.index ? "0" : props.currentIndex > props.index ? "-100vw" : "100vw"
);

let wasLoaded = false;

const _source = computed(
    () => {
      if (wasLoaded || Math.abs(props.currentIndex - props.index) < 2) {
        wasLoaded = true;
        return props.source;
      } else {
        return "";
      }
    }
);

</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;

  transform: translateX(v-bind(alignment));

  height: 100%;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: transform 0.2s ease-in-out;

  will-change: transform;
}

img {
  max-width: 100%;
  max-height: 100%;

  /*user-select: none;*/

  /*box-shadow: 5px 5px 50px -1px #000;*/
}

</style>