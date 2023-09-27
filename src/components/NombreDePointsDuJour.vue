<template>
  <CarteVierge>
    <h3 class="fr-h6 fr-mb-0">Vos points du jour</h3>
    <p class="fr-grid-row fr-grid-row--middle fr-m-0 fr-text--xs">
      <img src="/leaf.svg" alt="" class="fr-mr-1w" /> + {{ nombreDePointsDuJour }} points
    </p>
  </CarteVierge>
</template>

<script setup lang="ts">
  import CarteVierge from '@/components/CarteVierge.vue';

  defineProps<{
    nombreDePointsDuJour: number;
  }>();
</script>
