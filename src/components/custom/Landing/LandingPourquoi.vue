<template>
  <h2 class="fr-h2 fr-mb-6w text--center">À retrouver sur <i>J’agis</i></h2>
  <ul class="fr-grid-row flex-space-around fr-grid-row--gutters">
    <li
      v-for="(item, index) in items"
      :key="item.titre"
      class="fr-col-md-6 fr-col-12 fr-grid-row align-items--start"
      :class="index % 2 === 0 ? 'fr-pr-md-6w' : 'fr-pl-md-6w'"
    >
      <LandingPourquoiItem :titre="item.titre" :description="item.description" :picto="item.picto" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import LandingPourquoiItem from '@/components/custom/Landing/LandingPourquoiItem.vue';

  const items = [
    {
      picto: 'fr-icon-money-euro-circle-line',
      titre: 'Des aides financières',
      description: 'Découvrez tous les bons plans et subventions auxquels vous avez droit',
    },
    {
      picto: 'fr-icon-stethoscope-line',
      titre: 'Un suivi personnalisé',
      description: 'Faites le point sur vos habitudes et réduisez votre bilan environnemental au fil du temps',
    },
    {
      picto: 'fr-icon-store-line',
      titre: 'Des solutions locales',
      description: 'Trouvez toutes les initiatives et informations autour de chez vous',
    },
    {
      picto: 'fr-icon-search-line',
      titre: 'De l’info ludique',
      description: 'Comprenez ce qui se cache derrière vos choix du quotidien avec nos contenus sourcés',
    },
  ];
</script>

<style scoped>
  [class*='fr-icon-']::before {
    --icon-size: 1.25rem;
  }
</style>
