<script setup lang="ts">
import {RouteLocationRaw, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

interface Props {
  title: string;
  image?: string;
  to?: RouteLocationRaw;
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  image: undefined,
});

const router = useRouter();

function navigate() {
  if (props.to) {
    router.push(props.to);
  }
}

const { t } = useI18n();
</script>

<i18n>
de:
  loading: Kein Bild verfügbar
en:
  loading: No image available
</i18n>

<template>
  <div class="album-card" @click="navigate" :class="{'has-target': props.to !== undefined}">
    <div class="image">
      <img v-if="props.image !== undefined" :src="props.image" alt="Navigation card image" />
      <span v-else class="loading">{{ t('loading') }}</span>
    </div>
    <div class="content">
      <h3>{{ props.title }}</h3>
    </div>
  </div>
</template>

<style scoped lang="scss">
.album-card {
  font-family: 'Comfortaa', sans-serif;

  display: flex;
  flex-direction: column;

  flex: 1 1 0;

  width: 100%;
  max-width: 400px;

  overflow: hidden;

  //background-color: rgb(255, 255, 255, 0.1);

  color: var(--text-disabled);

  &.has-target {
    cursor: pointer;

    color: var(--text-medium);
  }

  .image {
    width: 100%;

    aspect-ratio: 1 / 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      border-radius: .5rem;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      color: var(--text-disabled);
      background-color: rgb(0, 0, 0, 0.1);
    }
  }

  .content {
    padding: 1rem 1.5rem;

    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>