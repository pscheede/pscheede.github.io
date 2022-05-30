import {computed, ref} from "vue";

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
});

export const routePath = computed(() => currentPath.value.slice(1));