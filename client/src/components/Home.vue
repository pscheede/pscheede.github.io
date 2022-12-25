<script setup lang="ts">
import {useI18n} from "vue-i18n";
import NavigationCard from "@/components/Navigation/NavigationCard.vue";
import {getHomepageData, HomepageData} from "@/components/service/api";
import {onMounted, ref} from "vue";

const {t} = useI18n();

const data = ref<HomepageData>();

onMounted(async () => {
  data.value = await getHomepageData();
});
</script>

<i18n lang="yaml">
de:
  greeting: Hi, ich bin Philipp
  occupation: Softwareentwickler und Freizeitfotograf
  portraits: Portraits
  landscape_and_nature: Landschaft und Natur
  software_projects: Softwareprojekte
  coming_soon: Bald verfügbar...
  explanation:
    main: Diese Website dient als {0} meiner Fotografie. Hauptsächlich fotografiere ich {1}. Aber auch verschiedene andere Motive sind hier zu finden.
    first: Portfolio
    second: Portraits
en:
  greeting: Hi, I'm Philipp
  occupation: Software developer and recreational photographer
  portraits: Portraits
  landscape_and_nature: Landscape and Nature
  software_projects: Software Projects
  coming_soon: Coming soon...
  explanation:
    main: This website serves as a {0} of my photography. I mainly photograph {1}. But you can also find photos of various other subjects here.
    first: portfolio
    second: portraits
</i18n>

<template>
  <div class="home-host">
    <div class="container">
      <div class="greeting">
        <h1>{{ t('greeting') }}</h1>
      </div>
      <div class="occupation">
        <h1>{{ t('occupation') }}</h1>
      </div>
      <div class="explanation">
        <i18n-t keypath="explanation.main" tag="span">
          <strong>{{ t('explanation.first') }}</strong>
          <strong>{{ t('explanation.second') }}</strong>
        </i18n-t>
      </div>

      <div class="cards">
        <NavigationCard to="/gallery" :title="t('portraits')" :image="data?.portraitPhotoUrl"/>
        <NavigationCard to="/gallery" :title="t('landscape_and_nature')" :image="data?.landscapePhotoUrl"/>
        <NavigationCard :title="t('software_projects')" :image="data?.softwarePhotoUrl" :subtitle="t('coming_soon')"/>
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

  padding-top: 10vh;
  padding-bottom: 4rem;

  h1 {
    margin: 0;
    padding: 0;

    font-size: inherit;
  }

  $occupationBaseSize: 2.5rem;
  .occupation {
    font-size: $occupationBaseSize;
    font-weight: 500;
    margin-bottom: 1rem;

    max-width: 80%;

    text-align: center;

    color: var(--text);
  }

  $baseGreetingSize: 1.75rem;
  .greeting {
    font-size: $baseGreetingSize;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .explanation {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: 'Comfortaa', sans-serif;

    font-size: 1rem;
    font-weight: 300;
    margin-top: 4rem;

    max-width: 80%;

    text-align: left;

    border-left: 2px solid var(--text-disabled);

    padding: 1rem;
    background-color: rgb(255, 255, 255, 0.03);
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

  @media only screen and (min-width: 650px) {
    .occupation {
      max-width: 60%
    }

    .explanation {
      max-width: 70%;
    }
  }

  @media only screen and (min-width: $b1) {
    .occupation {
      font-size: $occupationBaseSize * calc(4 / 3);
    }
    .greeting {
      font-size: $baseGreetingSize * calc(4 / 3);
    }
    .explanation {
      max-width: 60%;
    }
  }

  @media only screen and (min-width: $b2) {
    & {
      padding-top: 15vh;
    }
    .occupation {
      max-width: 80%;
    }
    .explanation {
      max-width: 40%;
    }
  }

  @media only screen and (min-width: $b3) {
    .occupation {
      font-size: $occupationBaseSize * calc(5 / 3);
    }

    .greeting {
      font-size: $baseGreetingSize * calc(5 / 3);
    }
    .explanation {
      font-size: 1.25rem;
    }
  }

  @media only screen and (min-width: $b4) {
    .explanation {
      max-width: 30%;
    }
  }
}
</style>

