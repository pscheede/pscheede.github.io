<script lang="ts" setup>
import {AlbumInfos, getCategories, getCategoryContent} from "@/components/service/api";
import {onMounted, ref, Ref, watch} from "vue";
import NavigationCard from "@/components/Navigation/NavigationCard.vue";
import {useAlbumTranslations} from "@/components/gallery/AlbumTranslations";
import {useI18n} from "vue-i18n";

const albums: Ref<AlbumInfos[]> = ref([]);
const highlightAlbum: Ref<AlbumInfos | undefined> = ref(undefined);

const categories = ref<string[]>([]);
const selectedCategory = ref('');

useAlbumTranslations();

const {t, locale} = useI18n();

onMounted(async () => {
  categories.value = await getCategories();
  categories.value.sort((a, b) => t(a).localeCompare(t(b)));
  selectedCategory.value = 'categories.all';
});

watch(selectedCategory, async (newCategory) => {
  const categoryContent = await getCategoryContent(newCategory);
  albums.value = categoryContent.albums;
  highlightAlbum.value = categoryContent.highlightAlbum;
});

watch(locale, () => {
  categories.value.sort((a, b) => t(a).localeCompare(t(b)));
});

function filterAlbums() {
  console.log(selectedCategory.value);
}
</script>

<i18n>
de:
  albums_title: Alben
  albums_description: Diese Seite enthält eine Übersicht aller Alben. Diese können nach Kategorien gefiltert werden.
  select_category: Kategorie auswählen
en:
  albums_title: Albums
  albums_description: This page contains an overview of all albums. They can be filtered by category.
  select_category: Select category
</i18n>

<template>
  <div class="album-overview-host">
    <div class="top-bar">
      <div class="title-box">
        <!-- Title with description -->
        <h1 class="title">{{ t('albums_title') }}</h1>
        <p class="description">{{ t('albums_description') }}</p>
      </div>
      <div class="dropdown-box">
        <!-- Dropdown for filtering by category -->
        <p>{{ t('select_category') }}</p>
        <div class="dropdown">
          <select v-model="selectedCategory" @change="filterAlbums">
            <option v-for="category in categories" :key="category" :value="category">{{ t(category) }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="albums">
      <NavigationCard v-if="highlightAlbum" :image="highlightAlbum.coverImageUrl"
                      :title="t(highlightAlbum.titleTextKey)"
                      :to="{ name: 'gallery', params: { albumSlug: highlightAlbum.slug } }"/>
      <NavigationCard v-for="album in albums" :key="album.slug" :image="album.coverImageUrl"
                      :title="t(album.titleTextKey)" :to="{ name: 'gallery', params: { albumSlug: album.slug } }"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.album-overview-host {
  margin: 0 5rem;
}

.albums {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.top-bar {
  color: var(--text-medium);

  margin: 5rem 0 10rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .dropdown-box {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .dropdown {
    select {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 0.5rem;

      // A reset of styles, including removing the default dropdown arrow
      appearance: none;
      // Additional resets for further consistency
      border: none;
      padding: .5rem 1rem;
      margin: 0;
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      cursor: inherit;
      line-height: inherit;

      font-weight: 600;

      color: var(--text-medium);
    }
  }
}
</style>