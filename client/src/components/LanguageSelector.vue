<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {locale} = useI18n();

function changeLanguage(lang: 'de' | 'en') {
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
  color: var(--text);

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