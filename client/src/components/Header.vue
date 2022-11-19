<template>
  <div><router-link to="/"><img src="/favicon.ico" alt=""><span>Philipp Scheede</span></router-link></div>
</template>

<script setup lang="ts">

</script>

<style scoped>
div {
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: row;

  justify-content: flex-start;
  align-items: center;

  color: var(--text-color);
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.34) 100%);

  padding: 1rem 1.5rem;
}

a {
  text-decoration: none;
  color: inherit;

  display: flex;
  flex-direction: row;

  justify-content: flex-start;
  align-items: center;
  gap: .75rem;
}

img {
  height: 2rem;
}

span {
  font-size: 1.25rem;
}
</style>