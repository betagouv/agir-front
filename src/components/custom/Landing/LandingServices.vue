<template>
  <h2 class="fr-h2">Ce que le coach vous propose</h2>
  <div
    v-for="(service, index) in services"
    :key="index"
    class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters fr-mb-4w"
  >
    <div class="fr-col-md-7" :class="index % 2 && 'reverse'">
      <h3 class="fr-h3">{{ service.titre }}</h3>
      <p class="fr-text--lg fr-mb-0">{{ service.description }}</p>
    </div>
    <div class="fr-col-md-5">
      <img :src="service.imgUrl" alt="" class="img-object-fit-contain full-width shadow border-radius--md" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const services = [
    {
      titre: 'Comprendre les enjeux et tester vos connaissances',
      description: 'Comprendre les enjeux et tester vos connaissances',
      imgUrl: '/OB-Coach.png',
    },
    {
      titre: 'Découvrir toutes les aides auxquelles vous avez droit',
      description: 'Disponibles à l’échelle nationale, votre région, de votre commune',
      imgUrl: '/OB-aide.png',
    },
    {
      titre: 'Accéder rapidement à des services utiles au quotidien',
      description: 'Comprendre les enjeux et tester vos connaissances',
      imgUrl: '/OB-Suivi.png',
    },
    {
      titre: 'Calculer vos impacts de vos usages',
      description: 'Comprendre les enjeux et tester vos connaissances',
      imgUrl: '/OB-aide.png',
    },
    {
      titre: 'Obtenir des recommandations adaptées à vous',
      description: 'Comprendre les enjeux et tester vos connaissances',
      imgUrl: '/OB-Suivi.png',
    },
  ];
</script>

<style scoped>
  @media (min-width: 48em) {
    .reverse {
      order: 1;
    }
  }
</style>
