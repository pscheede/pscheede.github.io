<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Header from "@/components/Header.vue";

const { t } = useI18n();
</script>

<i18n>
de:
  under_development: "Diese Seite befindet sich noch im Aufbau..."
  back: "Zurück zur Startseite"
en:
  under_development: "This page is still under development..."
  back: "Back to home page"
</i18n>

<template>
    <Header />
    <div class="text">
      <span>{{ t('under_development') }}</span>
      <a href="/">{{ t('back') }}</a>
    </div>
</template>

<style scoped lang="scss">
.text {
  position: fixed;

  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  font-size: 2rem;
  justify-content: center;
  align-items: center;

  color: var(--text-color);

  z-index: -20;

  a {
    color: inherit;

    font-size: 1.5rem;
    margin-top: 2rem;

    &:hover {
      color: var(--text-color-highlight);
    }
  }
}
</style>