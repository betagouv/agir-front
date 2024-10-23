<template>
  <CoachBilanCarboneComplet
    v-if="bilanCarboneCompletViewModel"
    :nombre-de-tonnes-annuel="bilanCarboneCompletViewModel.nombreDeTonnesAnnuel"
    :pourcentage-progress-bar="bilanCarboneCompletViewModel.pourcentageProgressBar"
  />
  <CoachBilanCarbonePartiel
    v-else-if="bilanCarbonePartielViewModel"
    :pourcentage-completion="bilanCarbonePartielViewModel.pourcentageCompletionTotal"
    :univers-bilan="bilanCarbonePartielViewModel.universBilan"
  />
</template>

<script setup lang="ts">
  import CoachBilanCarboneComplet from '@/components/custom/Coach/CoachBilanCarboneComplet.vue';
  import CoachBilanCarbonePartiel from '@/components/custom/Coach/CoachBilanCarbonePartiel.vue';
  import {
    BilanCarboneCompletAccueilViewModel,
    BilanCarbonePartielAccueilViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarboneAccueil.presenter.impl';

  defineProps<{
    bilanCarboneCompletViewModel?: BilanCarboneCompletAccueilViewModel;
    bilanCarbonePartielViewModel?: BilanCarbonePartielAccueilViewModel;
  }>();
</script>
