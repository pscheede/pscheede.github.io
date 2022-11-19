<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Header from "@/components/Header.vue";

const {t} = useI18n();
</script>

<i18n lang="yaml">
de:
  greeting: Hi, ich bin Philipp
  dev: Softwareentwickler,
  photo: Portrait- und Landschaftsfotograf
  photographer: Hobbyfotograf
  gallery: Bildergalerie
  check_out: 'Links:'
  instagram: Instagram
en:
  greeting: Hi, I'm Philipp
  dev: Software Developer,
  photo: Portrait and Landscape Photographer
  photographer: Amateur Photographer
  gallery: photo gallery
  check_out: 'check out:'
  instagram: instagram
</i18n>

<template>
  <div class="home-host">
    <Header/>

    <div class="container">
      <!--
        Required stuff
        - greeting
        - name
        - occupation
        - links (gallery, instagram)
       -->

      <div class="greeting">
        <span>{{ t('greeting') }}</span>
      </div>
      <div class="occupation">
        <span>{{ t('dev') }}</span>
        <br>
        <span>{{ t('photo') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$b1: 900px;
$b2: 1200px;
$b3: 1400px;
$b4: 2000px;

.container {
  color: var(--text-color);
  font-family: 'Cormoramt Garamond', serif;

  display: flex;
  flex-direction: column;

  align-items: center;

  margin-top: 20vh;

  .occupation {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;

    max-width: 80%;

    text-align: center;
  }

  .greeting {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  @media only screen and (min-width: 480px) {
    .occupation {
      font-size: 3rem;
    }
  }

  @media only screen and (min-width: $b1) {
    .occupation {
      font-size: 5rem;
    }
  }

  @media only screen and (min-width: $b2) {
    .occupation {
      max-width: 60%;
    }
  }

  @media only screen and (min-width: $b3) {
    .occupation {
      font-size: 6rem;
    }

    .greeting {
      font-size: 2.5rem;
    }
  }

  @media only screen and (min-width: $b4) {
    .occupation {
      max-width: 80%;
    }
  }
}
</style>

