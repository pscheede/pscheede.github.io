<template>
  <div class="container">
    <h1>Hi, my name is Philipp Scheede!</h1>
    <h2>Have a look at my <a href="#/gallery">Photography</a>!</h2>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container {
  padding-top: 20rem;
  color: var(--text-color);
}

h1 {
  margin-bottom: 2rem;
}

a {
  color: var(--text-color);
}

a:visited {
  color: var(--text-color);
}

a:hover {
  color: var(--text-color-highlight);
}
</style>