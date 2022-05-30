<template>
  <div class="container">
    <h1>{{ t.t('hello') }}</h1>
    <i18n-t keypath="look_at" tag="h2">
      <a href="#/gallery">{{ t.t('photography') }}</a>
    </i18n-t>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

const t = useI18n();
</script>

<style scoped>
.container {
  position: absolute;
  top: 20%;
  left: 50%;
  width: fit-content;
  transform: translateX(-50%);
  color: var(--text-color);
}

h1 {
  margin-bottom: 2rem;
}

a {
  color: var(--text-color);
}

a:visited {
  color: var(--text-color);
}

a:hover {
  color: var(--text-color-highlight);
}
</style>

<i18n lang="yaml">
de:
  hello: Hi, mein Name ist Philipp Scheede!
  photography: Fotografie
  look_at: Sieh dir meine {0} an.
en:
  hello: Hi, my name is Philipp Scheede!
  photography: photography
  look_at: Have a look at my {0}.
</i18n>