<template>
  <div v-if="bilanCarboneCompletViewModel">
    <!--    C'est un peu verbeux, voir pour déconstruire plutôt -->
    <CoachBilanCarboneComplet
      :nombre-de-tonnes-annuel="bilanCarboneCompletViewModel.nombreDeTonnesAnnuel"
      :pourcentage-progess-bar="bilanCarboneCompletViewModel.pourcentageProgessBar"
    />
  </div>
  <div v-else-if="bilanCarbonePartielViewModel">
    <CoachBilanCarbonePartiel
      :pourcentage-completion="bilanCarbonePartielViewModel.pourcentageCompletionTotal"
      :univers-bilan="bilanCarbonePartielViewModel.universBilan"
    />
  </div>
</template>

<script setup lang="ts">
  import CoachBilanCarboneComplet from '@/components/custom/Coach/CoachBilanCarboneComplet.vue';
  import CoachBilanCarbonePartiel from '@/components/custom/Coach/CoachBilanCarbonePartiel.vue';
  import {
    BilanCarboneCompletViewModel,
    BilanCarbonePartielViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{
    bilanCarboneCompletViewModel: BilanCarboneCompletViewModel;
    bilanCarbonePartielViewModel: BilanCarbonePartielViewModel;
  }>();
</script>
