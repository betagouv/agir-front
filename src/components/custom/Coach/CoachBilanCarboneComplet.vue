<template>
  <h2 class="fr-h2">Votre <span class="text--bleu">bilan environnemental</span> complet</h2>
  <BilanCarboneProgressBar
    :impact-tonne-annuel="nombreDeTonnesAnnuel"
    :pourcentage-progess-bar="pourcentageProgessBar"
    class="fr-col-md-6 fr-mb-4w"
  />
</template>

<script setup lang="ts">
  import BilanCarboneProgressBar from '@/components/custom/BilanCarbone/BilanCarboneProgressBar.vue';
  import { BilanCarboneCompletViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{
    nombreDeTonnesAnnuel: BilanCarboneCompletViewModel['nombreDeTonnesAnnuel'];
    pourcentageProgessBar: BilanCarboneCompletViewModel['pourcentageProgessBar'];
  }>();
</script>
