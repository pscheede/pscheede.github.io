<script lang="ts" setup>
import Header from "@/components/Navigation/Header.vue";
import {AlbumInfos, getAlbums} from "@/components/service/api";
import {onMounted, ref, Ref} from "vue";
import NavigationCard from "@/components/Navigation/NavigationCard.vue";
import {useAlbumTranslations} from "@/components/gallery/AlbumTranslations";
import {useI18n} from "vue-i18n";

const albums: Ref<AlbumInfos[]> = ref([]);
onMounted(async () => {
  albums.value.push(...await getAlbums());
});

useAlbumTranslations();

const { t } = useI18n();
</script>

<template>
  <div class="album-overview-host">
    <Header/>
    <div class="albums">
      <NavigationCard v-for="album in albums" :key="album.slug" :image="album.coverImageUrl" :title="t(album.titleTextKey)" :to="{ name: 'gallery', params: { albumSlug: album.slug } }" />
    </div>
  </div>
</template>

<style scoped>
.albums {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1rem;
}
</style>