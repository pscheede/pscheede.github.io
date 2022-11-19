<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {locale} = useI18n();

function changeLanguage(lang: 'de' | 'en') {
  console.log('change language to', lang);
  locale.value = lang;
}
</script>

<template>
  <div class="language-selector">
    <div class="language" :class="{active: locale === 'en'}" @click="changeLanguage('de')">DE</div>
    <div class="language" :class="{active: locale === 'de'}" @click="changeLanguage('en')">EN</div>
  </div>
</template>

<style scoped lang="scss">
.language {
  display: none;
  color: var(--text-color);

  cursor: pointer;

  // disable text selection
  user-select: none;

  &.active {
    display: block;
  }

  &:hover {
    color: var(--primary-dark);
  }
}
</style>