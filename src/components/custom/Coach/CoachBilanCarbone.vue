<template>
  <CoachBilanCarboneComplet
    v-if="bilanCarboneCompletViewModel"
    :nombre-de-tonnes-annuel="bilanCarboneCompletViewModel.nombreDeTonnesAnnuel"
    :pourcentage-progress-bar="bilanCarboneCompletViewModel.pourcentageProgressBar"
  />
  <CoachBilanCarbonePartiel
    v-else-if="bilanCarboneAFaireViewModel"
    :pourcentage-completion="bilanCarboneAFaireViewModel.pourcentageCompletionTotal"
    :thematique-bilan="bilanCarboneAFaireViewModel.thematiquesBilan"
  />
</template>

<script lang="ts" setup>
  import CoachBilanCarbonePartiel from '@/components/custom/Coach/CoachBilanCarboneAFaire.vue';
  import CoachBilanCarboneComplet from '@/components/custom/Coach/CoachBilanCarboneComplet.vue';
  import { BilanCarboneAFaireViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
  import { BilanCarboneCompletAccueilViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarboneAccueil.presenter.impl';

  defineProps<{
    bilanCarboneCompletViewModel?: BilanCarboneCompletAccueilViewModel;
    bilanCarboneAFaireViewModel?: BilanCarboneAFaireViewModel;
  }>();
</script>
