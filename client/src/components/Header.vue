<script setup lang="ts">
import {useI18n} from "vue-i18n";
import LanguageSelector from "@/components/LanguageSelector.vue";

const {t} = useI18n();
</script>

<i18n>
de:
  gallery: galerie
  about: über mich
en:
  gallery: gallery
  about: about
</i18n>

<template>
  <div class="header-host">
    <div class="logo">
      <router-link to="/" class="no-color"><span>PHILIPP SCHEEDE</span></router-link>
    </div>
    <div class="navigation">
      <router-link to="/gallery"><span>{{ t('gallery') }}</span></router-link>
      <router-link to="/about"><span>{{ t('about') }}</span></router-link>
    </div>
    <div class="right">
      <div class="language">
        <LanguageSelector/>
      </div>
      <div class="social github">
        <a href="https://www.github.com/pscheede" target="_blank"></a>
      </div>
      <div class="social instagram">
        <a href="https://www.instagram.com/photos_by_philipp/" target="_blank"></a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-host {
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  color: var(--text-color);

  padding: 2rem 2.5rem;

  > div {
    flex: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);

    opacity: 80%;

    z-index: -1;
  }
}

a {
  text-decoration: none;
  color: inherit;

  display: flex;
  flex-direction: row;

  justify-content: flex-start;
  align-items: center;
  gap: .75rem;

  &:hover:not(.router-link-exact-active) {
    color: var(--primary-dark);
  }

  &.router-link-exact-active {
    cursor: default;

    &:not(.no-color) {
      opacity: 60%;
    }
  }
}

.logo {
  a {
    max-width: fit-content;
  }
}

.navigation {
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  gap: 4rem;
}

.right {
  display: flex;
  flex-direction: row;

  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  .social {
    display: inline-block;

    cursor: pointer;

    height: 1.5rem;
    width: 1.5rem;

    background-color: white;

    &.instagram {
      mask: url(./src/assets/instagram-icon.svg);
      -webkit-mask: url(./src/assets/instagram-icon.svg);
    }

    &.github {
      mask: url(./src/assets/github-icon.svg);
      -webkit-mask: url(./src/assets/github-icon.svg);
    }

    &.github, &.instagram {
      mask-size: cover;
      -webkit-mask-size: cover;
    }

    &:hover {
      background-color: var(--primary-dark);
    }

    a {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
}
</style>