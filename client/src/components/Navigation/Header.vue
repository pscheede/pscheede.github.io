<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import LanguageSelector from "@/components/LanguageSelector.vue";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import HamburgerButton from "@/components/Navigation/HamburgerButton.vue";
import {useRoute} from "vue-router";

const {t} = useI18n();

const menuActive = ref(false);

const breakPoint = 900;

const width = ref(window.innerWidth);

function resize() {
  width.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", resize);
})

onUnmounted(() => {
  window.removeEventListener("resize", resize);
})

const enableMenu = computed(() => {
  return width.value < breakPoint;
});

const route = useRoute();
watch(route, () => {
  menuActive.value = false;
});
</script>

<i18n>
de:
  gallery: galerie
  about: über mich
  contact: kontakt
en:
  gallery: gallery
  about: about
  contact: contact
</i18n>

<template>
  <Transition>
    <div v-if="enableMenu" v-show="menuActive" class="side-menu">
      <div class="navigation hide-in-menu">
        <router-link to="/gallery"><span>{{ t('gallery') }}</span></router-link>
        <router-link to="/about"><span>{{ t('about') }}</span></router-link>
        <router-link to="/contact"><span>{{ t('contact') }}</span></router-link>
      </div>
      <div class="socials">
        <div class="social github hide-in-menu">
          <a href="https://www.github.com/pscheede" target="_blank"></a>
        </div>
        <div class="social instagram hide-in-menu">
          <a href="https://www.instagram.com/photos_by_philipp/" target="_blank"></a>
        </div>
      </div>
    </div>
  </Transition>
  <div class="header-host">
    <div class="logo">
      <router-link class="no-color" to="/"><span>PHILIPP SCHEEDE</span></router-link>
    </div>
    <div v-if="!enableMenu" class="navigation hide-in-menu">
      <router-link to="/gallery"><span>{{ t('gallery') }}</span></router-link>
      <router-link to="/about"><span>{{ t('about') }}</span></router-link>
      <router-link to="/contact"><span>{{ t('contact') }}</span></router-link>
    </div>
    <div class="right">
      <div class="language">
        <LanguageSelector/>
      </div>
      <div v-if="!enableMenu" class="social github hide-in-menu">
        <a href="https://www.github.com/pscheede" target="_blank"></a>
      </div>
      <div v-if="!enableMenu" class="social instagram hide-in-menu">
        <a href="https://www.instagram.com/photos_by_philipp/" target="_blank"></a>
      </div>
      <div v-if="enableMenu" class="menu-button">
        <HamburgerButton v-model:active="menuActive"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$b1: 900px;

.header-host {
  position: sticky;
  top: 0;

  height: 100px;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  color: var(--text-medium);

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

  .navigation {
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;

    flex: 2 0;

    gap: 4rem;
  }

  .right {
    display: flex;
    flex-direction: row;

    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    .language {
      margin-right: 1rem;
    }
  }

  .menu-button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(.router-link-exact-active) {
      color: var(--primary-dark);
    }
  }

  &.router-link-exact-active {
    cursor: default;

    &:not(.no-color) {
      color: var(--text-disabled);
    }
  }
}

.logo {
  a {
    max-width: fit-content;
  }
}

.side-menu {
  position: fixed;
  top: 0;
  right: 0;

  width: 100%;
  min-height: 100vh;

  color: var(--text-medium);
  background-color: var(--bg-color);

  z-index: 0;

  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: center;

  gap: 2rem;

  $verticalMargin: 6rem;
  padding: calc(100px + $verticalMargin) 2.5rem $verticalMargin 2.5rem;

  transform: translate(0, 0);

  &.v-enter-active, &.v-leave-active {
    transition: transform 0.5s ease;
  }

  &.v-enter-from, &.v-leave-to {
    transform: translate(100%, 0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);

    z-index: -1;
  }

  .navigation {
    font-size: 1.125rem;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    gap: 2rem;
  }

  .socials {
    margin-top: 4rem;
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;

    gap: 3rem;

    .social {
      transform: scale(1.3);
    }
  }
}

.social {
  display: inline-block;

  cursor: pointer;

  height: 1.5rem;
  width: 1.5rem;

  background-color: var(--text-medium);

  &.instagram {
    mask: url(/instagram-icon.svg);
    -webkit-mask: url(/instagram-icon.svg);
  }

  &.github {
    mask: url(/github-icon.svg);
    -webkit-mask: url(/github-icon.svg);
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
</style>