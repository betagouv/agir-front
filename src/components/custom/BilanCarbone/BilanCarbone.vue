<template>
  <BilanCarboneComplet v-if="bilanCarboneComplet" :bilan-carbone-view-model="bilanCarboneComplet" />
  <BilanCarbonePartiel v-else-if="bilanCarbonePartiel" :bilan-carbone-partiel-view-model="bilanCarbonePartiel" />
  <BilanCarboneAFaire
    v-else
    :pourcentage-completion-total="bilanCarboneAFaire!.pourcentageCompletionTotal"
    :thematiques="bilanCarboneAFaire!.thematiquesBilan"
  />
</template>

<script lang="ts" setup>
  import BilanCarboneAFaire from '@/components/pages/BilanCarboneAFaire.vue';
  import BilanCarboneComplet from '@/components/pages/BilanCarboneComplet.vue';
  import BilanCarbonePartiel from '@/components/pages/BilanCarbonePartiel.vue';
  import {
    BilanCarboneAFaireViewModel,
    BilanCarboneCompletViewModel,
    BilanCarbonePartielViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{
    bilanCarboneComplet?: BilanCarboneCompletViewModel;
    bilanCarbonePartiel?: BilanCarbonePartielViewModel;
    bilanCarboneAFaire?: BilanCarboneAFaireViewModel;
  }>();
</script>
