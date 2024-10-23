<template>
  <h2 class="fr-h3 fr-mb-1w">Mon <span class="text--bleu">bilan environnemental</span></h2>
  <p class="fr-text--md">Connaître l’impact de son mode vie pour agir</p>
  <BilanCarboneProgressBar
    :impact-tonne-annuel="nombreDeTonnesAnnuel"
    :pourcentage-progress-bar="pourcentageProgressBar"
    class="fr-col-md-6 fr-mb-4w"
  />
  <router-link :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }" class="fr-link">Voir mon bilan détaillé</router-link>
</template>

<script setup lang="ts">
  import BilanCarboneProgressBar from '@/components/custom/BilanCarbone/BilanCarboneProgressBar.vue';
  import { BilanCarboneCompletViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';

  defineProps<{
    nombreDeTonnesAnnuel: BilanCarboneCompletViewModel['nombreDeTonnesAnnuel'];
    pourcentageProgressBar: BilanCarboneCompletViewModel['pourcentageProgressBar'];
  }>();
</script>
