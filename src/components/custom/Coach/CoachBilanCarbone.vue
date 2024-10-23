<template>
  <CoachBilanCarboneComplet
    v-if="bilanCarboneCompletViewModel"
    :nombre-de-tonnes-annuel="bilanCarboneCompletViewModel.nombreDeTonnesAnnuel"
    :pourcentage-progess-bar="bilanCarboneCompletViewModel.pourcentageProgessBar"
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
    BilanCarboneCompletViewModel,
    BilanCarbonePartielViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{
    bilanCarboneCompletViewModel?: BilanCarboneCompletViewModel;
    bilanCarbonePartielViewModel?: BilanCarbonePartielViewModel;
  }>();
</script>
