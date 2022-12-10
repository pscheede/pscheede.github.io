<script lang="ts" setup>
import Header from "@/components/Navigation/Header.vue";
import {AlbumInfos, getAlbums} from "@/components/service/api";
import {onMounted, ref, Ref} from "vue";
import NavigationCard from "@/components/Navigation/NavigationCard.vue";

const albums: Ref<AlbumInfos[]> = ref([]);
onMounted(async () => {
  albums.value.push(...await getAlbums());
});
</script>

<template>
  <div class="album-overview-host">
    <Header/>
    <NavigationCard v-for="album in albums" :key="album.slug" :image="album.coverImageUrl" :title="album.titleTextKey"/>
  </div>
</template>

<style scoped>

</style>