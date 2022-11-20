<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Header from "@/components/Header.vue";
import NavigationCard from "@/components/NavigationCard.vue";
import {getHomepageData, HomepageData} from "@/components/service/api";
import {onMounted, ref} from "vue";

const {t} = useI18n();

const data = ref<HomepageData>();

onMounted(async () => {
  data.value = await getHomepageData();
  console.log('wow');
  console.log(data.value);
});
</script>

<i18n lang="yaml">
de:
  greeting: Hi, ich bin Philipp
  developer: Softwareentwickler,
  photographer: Portrait- und Landschaftsfotograf
  portraits: Portraits
  landscape_and_nature: Landschaft und Natur
  software_projects: Softwareprojekte
  coming_soon: Bald verfügbar...
en:
  greeting: Hi, I'm Philipp
  developer: Software Developer,
  photographer: Portrait and Landscape Photographer
  portraits: Portraits
  landscape_and_nature: Landscape and Nature
  software_projects: Software Projects
  coming_soon: Coming soon...
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
        <h1>{{ t('greeting') }}</h1>
      </div>
      <div class="occupation">
        <h1>{{ t('developer') }}</h1>
        <h1>{{ t('photographer') }}</h1>
      </div>

      <div class="cards">
        <NavigationCard to="/gallery" title="Portraits" :image="data?.portraitPhotoUrl"/>
        <NavigationCard to="/gallery" title="Landscape and Nature" :image="data?.landscapePhotoUrl"/>
        <NavigationCard title="Software Projects" :image="data?.softwarePhotoUrl" :subtitle="t('coming_soon')"/>
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
  color: var(--text-medium);
  font-family: 'Cormoramt Garamond', serif;

  display: flex;
  flex-direction: column;

  align-items: center;

  padding-top: 20vh;
  padding-bottom: 4rem;

  h1 {
    margin: 0;
    padding: 0;

    font-size: inherit;
  }

  .occupation {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;

    max-width: 80%;

    text-align: center;

    color: var(--text);
  }

  .greeting {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .cards {
    margin-top: 10rem;

    width: calc(100% - 6rem);

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 3rem;

    justify-content: center;
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
    .greeting {
      font-size: 2rem;
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

