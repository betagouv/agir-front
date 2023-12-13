<template>
  <h2 class="fr-h2 fr-mb-6w fr-px-md-6w">Agir, pour quoi faire ?</h2>
  <div
    v-for="(service, index) in services"
    :key="index"
    class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters fr-mb-4w fr-px-md-6w"
  >
    <div class="fr-col-md-7" :class="index % 2 == 0 && 'reverse'">
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
      description: 'Des contenus ludiques, des quiz et des articles pour apprendre à votre rythme.',
      imgUrl: '/HP-1-comprendre-les-enjeux.jpg',
    },
    {
      titre: 'Des aides financières pour faire des économies',
      description:
        'Vélo, voiture électrique, réparation, rénovation énergétique, compost, etc. , à l’échelle nationale, de votre région, de votre commune.',
      imgUrl: '/HP-2-aides.jpg',
    },
    {
      titre: 'Souscrire et organiser des services utiles au quotidien',
      description:
        'Suivi de votre consommation d’électricité ou de gaz, banque de recettes de cuisine, choix du moyen de transport le plus économe etc.',
      imgUrl: '/HP-3-services.jpg',
    },
    {
      titre: 'Comprendre les impacts de vos usages et obtenir des recommandations adaptées à votre situation',
      description:
        'Aide à la décision et panel de solutions moins impactantes, programmes d’accompagnement thématiques.',
      imgUrl: '/HP-4-recommandations.jpg',
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
