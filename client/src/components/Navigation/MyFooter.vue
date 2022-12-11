<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n();
</script>

<i18n>
de:
  impressum: Impressum
en:
  impressum: Legal Notice
</i18n>

<template>
  <div class="footer-host">
    <router-link to="/impressum">{{ t('impressum') }}</router-link>
    <span class="copyright">
      © 2022 Philipp Scheede
    </span>
  </div>
</template>

<style scoped lang="scss">
.footer-host {
  color: var(--text-medium);
  padding: 1rem;

  display: flex;
  justify-content: flex-end;

  gap: 2rem;

  background-color: rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;

  a {
    color: inherit;
    text-decoration: none;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--primary-dark);
      }
    }
  }
}
</style>color