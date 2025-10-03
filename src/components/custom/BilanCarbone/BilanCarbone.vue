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
  import BilanCarboneAFaire from '@/components/custom/BilanCarbone/BilanCarboneAFaire.vue';
  import BilanCarboneComplet from '@/components/custom/BilanCarbone/BilanCarboneComplet.vue';
  import BilanCarbonePartiel from '@/components/custom/BilanCarbone/BilanCarbonePartiel.vue';
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
