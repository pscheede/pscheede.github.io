<script setup lang="ts">
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

interface Props {
  title: string;
  subtitle?: string;
  image?: string;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
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
  <div class="navigation-card" @click="navigate" :class="{'has-target': props.to !== undefined}">
    <div class="image">
      <img v-if="props.image !== undefined" :src="props.image" alt="Navigation card image" />
      <span v-else class="loading">{{ t('loading') }}</span>
    </div>
    <div class="content">
      <h2>{{ props.title }}</h2>
      <p v-if="props.subtitle">{{ props.subtitle }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation-card {
  font-family: 'Comfortaa', sans-serif;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;

  border-radius: .5rem;
  overflow: hidden;

  background-color: rgb(255, 255, 255, 0.1);

  color: var(--text-disabled);

  &.has-target {
    cursor: pointer;

    color: var(--text-medium);

    // scale on hover
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }

  .image {
    $imageHeight: 300px;
    width: 100%;
    height: $imageHeight;

    img {
      width: 100%;
      height: $imageHeight;
      object-fit: cover;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: $imageHeight;

      color: var(--text-disabled);
      background-color: rgb(0, 0, 0, 0.1);
    }
  }

  .content {
    padding: 1.5rem 2rem;

    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      font-size: 1.5rem;
      font-weight: 400;
    }

    p {
      font-size: 1rem;
      margin-top: .5rem;
    }
  }
}
</style>