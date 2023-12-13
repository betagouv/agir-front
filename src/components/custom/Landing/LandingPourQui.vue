<template>
  <h2 class="fr-h2 text--white">À qui ça s’adresse ?</h2>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-md-3 fr-col-12 text--center" v-for="personna in personnas" :key="personna.text">
      <img :src="personna.imageUrl" class="border-radius--full fr-mb-2w" alt="" />
      <p class="fr-text--lg fr-mb-0 text--white">{{ personna.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const personnas: { imageUrl: string; text: string }[] = [
    {
      imageUrl: '/personna-1.jpg',
      text: 'Je veux agir, mais je ne sais par où commencer',
    },
    {
      imageUrl: '/personna-2.jpg',
      text: 'Je cherche des solutions simples et adaptées à mon quotidien',
    },
    {
      imageUrl: '/personna-3.jpg',
      text: 'Je fais déjà plein de choses mais je veux aller encore plus loin',
    },
    {
      imageUrl: '/personna-4.jpg',
      text: 'Je veux trouver une communauté pour faire la différence ensemble !',
    },
  ];
</script>
