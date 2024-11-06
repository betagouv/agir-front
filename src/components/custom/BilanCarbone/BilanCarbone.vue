<template>
  <BilanCarboneComplet v-if="bilanCarboneComplet" :bilan-carbone-view-model="bilanCarboneComplet" />
  <BilanCarbonePartiel v-else-if="bilanCarbonePartiel" :bilan-carbone-partiel-view-model="bilanCarbonePartiel" />
</template>

<script setup lang="ts">
  import BilanCarboneComplet from '@/components/pages/BilanCarboneComplet.vue';
  import BilanCarbonePartiel from '@/components/pages/BilanCarbonePartiel.vue';
  import {
    BilanCarboneCompletViewModel,
    BilanCarbonePartielViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{
    bilanCarboneComplet?: BilanCarboneCompletViewModel;
    bilanCarbonePartiel?: BilanCarbonePartielViewModel;
  }>();
</script>
