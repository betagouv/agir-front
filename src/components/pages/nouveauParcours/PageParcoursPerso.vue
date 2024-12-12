<template>
  Bonjour
  <section>
    <h1>Prochain objectif :</h1>
  </section>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const codePostal = route.query.token as string;
</script>

<style scoped></style>
