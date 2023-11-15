<template>
  <h2 class="fr-h2 fr-mb-0">Recommandations personnalisées</h2>
  <p class="fr-text--xl">En fonction de qui vous êtes et où vous en êtes</p>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="item in [1, 2, 3]" :key="item" class="fr-col-4">
      <CoachCardRecommandations :thematique="toto.thematique" :titre="toto.titre" :image="toto.image" :url="toto.url" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachCardRecommandations from './CoachCardRecommandations.vue';

  const toto = {
    thematique: '🌍 Global',
    titre: 'Quiz avion',
    image: 'https://picsum.photos/400/200',
    url: 'google.com',
  };
</script>

<style scoped></style>
