<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import Hammer from 'hammerjs';

const props = defineProps<{
  source: string,
  index: number,
  currentIndex: number,
  sizes: { [key: number]: string },
}>();

const emit = defineEmits<{ (e: "prev"): void, (e: "next"): void }>();

const alignment = computed(
    () => props.currentIndex === props.index ? "0" : props.currentIndex > props.index ? "-100vw" : "100vw",
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
    },
);

const _sizes = computed(
    () => {
      if (wasLoaded || Math.abs(props.currentIndex - props.index) < 2) {
        wasLoaded = true;
        return props.sizes;
      } else {
        return {};
      }
    },
);

const picture = ref<HTMLElement>();

let lastScale = 1;
let lastPosX = 0;
let lastPosY = 0;
let maxPosX = 0;
let maxPosY = 0;
const transX = ref(0);
const transY = ref(0);
const scale = ref(1);
const transform = computed(() => `translate(${transX.value}px, ${transY.value}px) scale(${scale.value}, ${scale.value})`);

watch(() => props.currentIndex, (newIdx) => {
  if (newIdx !== props.index) {
    transX.value = 0;
    transY.value = 0;
    scale.value = 1;
  }
});

let hammertime;
onMounted(() => {
  const el = picture.value!;
  hammertime = new Hammer(picture.value!, {});
  hammertime.get('pinch').set({enable: true});
  hammertime.get('pan').set({direction: Hammer.DIRECTION_ALL});
  hammertime.on('swipeleft', () => {
    if (scale.value > 1) {
      return;
    }
    emit("next");
  });
  hammertime.on('swiperight', () => {
    if (scale.value > 1) {
      return;
    }
    emit("prev");
  });
  hammertime.on('pan panend pinch pinchend', (e) => {
    //pan
    if (scale.value != 1) {
      transX.value = lastPosX + e.deltaX;
      transY.value = lastPosY + e.deltaY;
      // maxPosX = Math.ceil((scale.value - 1) * window.innerWidth / 2);
      const actualWidth = el.clientWidth * scale.value;
      maxPosX = actualWidth > window.innerWidth ? Math.ceil((actualWidth - window.innerWidth) / 2) : 0;
      // maxPosY = Math.ceil((scale.value - 1) * window.outerHeight / 2);
      const actualHeight = el.clientHeight * scale.value;
      maxPosY = actualHeight > window.innerHeight ? Math.ceil((actualHeight - window.innerHeight) / 2) : 0;
      if (transX.value > maxPosX) {
        transX.value = maxPosX;
      }
      if (transX.value < -maxPosX) {
        transX.value = -maxPosX;
      }
      if (transY.value > maxPosY) {
        transY.value = maxPosY;
      }
      if (transY.value < -maxPosY) {
        transY.value = -maxPosY;
      }
    } else {
      transX.value = 0;
      transY.value = 0;
    }

    if (e.type === "pinch") {
      scale.value = Math.max(1, Math.min(lastScale * e.scale, 10));
    }

    if (e.type === "pinchend") {
      lastScale = scale.value;
    }

    if (e.type === "panend") {
      lastPosX = transX.value < maxPosX ? transX.value : maxPosX;
      lastPosY = transY.value < maxPosY ? transY.value : maxPosY;
    }
  });
});

const pixelRatio = ref(window.devicePixelRatio || 1);

function resize() {
  pixelRatio.value = window.devicePixelRatio || 1;
}

onMounted(() => {
  window.addEventListener("resize", resize);
})

onUnmounted(() => {
  window.removeEventListener("resize", resize);
})
</script>

<template>
  <div class="container">
    <picture ref="picture">
      <source v-for="(value, key) in _sizes" v-if="scale === 1" :media="`(max-width: ${key / pixelRatio}px)`"
              :srcset="value">
      <img :src="_source" alt="" v-on:dragstart.prevent="">
    </picture>
  </div>
</template>


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
  will-change: transform;
  transform: v-bind(transform);
}

img, picture {
  max-width: 100%;
  max-height: 100%;

  /*user-select: none;*/

  /*box-shadow: 5px 5px 50px -1px #000;*/
}

</style>