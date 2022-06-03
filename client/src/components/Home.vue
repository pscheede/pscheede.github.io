<template>
  <div class="row">
    <div class="container">
      <h1>Philipp Scheede</h1>
      <h2>{{ t.t('photographer') }}</h2>
    </div>
    <div class="container links">
      <h3 class="check-out">{{ t.t('check_out' )}}</h3>
      <ul>
        <li><a href="#/gallery">{{ t.t('gallery') }}</a></li>
        <li><a href="https://instagram.com/photos_by_philipp" target="_blank" rel="noopener noreferrer">{{ t.t('instagram') }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

const t = useI18n();
</script>

<style scoped lang="scss">
$b1: 900px;
$b2: 1200px;
$b3: 1400px;
$b4: 2000px;

.row {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;

  height: calc(100% - 2rem);
  padding: 0 1rem;

  font-size: 1rem;

  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;

  width: fit-content;
  margin: 1rem 0;

  @media only screen and (min-width: $b1) {
    font-size: 1.125rem;

    flex-direction: row;
    align-items: center;

    gap: 5rem;

    width: 100%;
  }

  @media only screen and (min-width: $b2) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: $b3) {
    gap: 10rem;
  }

  @media only screen and (min-width: $b4) {
    font-size: 1.75rem;
    gap: 15rem;
  }
}

.container {
  color: var(--text-color);

  display: flex;
  flex-direction: column;

  align-items: flex-start;
}

.links {
  @media only screen and (min-width: $b1) {
    margin-top: 2em;
  }
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 2em;
  font-weight: 300;

  @media only screen and (min-width: 370px) {
    font-size: 2.5em;
  }

  @media only screen and (min-width: 430px) {
    font-size: 3em;
  }

  @media only screen and (min-width: $b1) {
    font-size: 4em;
  }

  @media only screen and (min-width: $b3) {
    font-size: 4.5em;
  }
}

h2, h3 {
  margin-bottom: 1rem;

  &.check-out {
    margin-bottom: 1.5rem;
  }
}


ul li {
  list-style: none;
  margin-bottom: 1rem;
}

a {
  color: var(--text-color);

  &:visited {
    color: var(--text-color);
  }

  &:hover {
    color: var(--text-color-highlight);
  }
}
</style>

<i18n lang="yaml">
de:
  photographer: Hobbyfotograf
  gallery: Bildergalerie
  check_out: 'Links:'
  instagram: Instagram
en:
  photographer: Amateur Photographer
  gallery: photo gallery
  check_out: 'check out:'
  instagram: instagram
</i18n>