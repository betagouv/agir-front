<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-9">
      <BarreDeProgression :value="value" :value-max="valueMax" :label="label" :couleur="couleur" min-width="8%" />
    </div>
    <div class="fr-col fr-text--xs fr-mb-0 fr-pl-0">
      <span class="fr-text--bold">{{ value }}</span
      >/{{ valueMax }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';

  defineProps<{
    label: string;
    value: number;
    valueMax: number;
    couleur: string;
  }>();
</script>
