<template>
  <aside class="background-bleu text--white fr-p-3w">
    <h2 class="fr-h5 text--white fr-mb-2w">Impact du jour</h2>
    <p class="fr-mb-2w">
      <span class="text--3xl fr-text--bold">{{ consommationDuJour }}</span>
      <span class="fr-text--bold"> kg </span>
      de CO₂-e
    </p>
    <p class="fr-text--bold fr-text--sm fr-mb-2w">Autant d'émissions que pour fabriquer</p>
    <p class="fr-grid-row fr-grid-row--middle fr-text--bold fr-mb-0">
      <span class="fr-icon-drop-fill fr-mr-2v" aria-hidden="true"></span>
      <span class="text--3xl fr-mr-2v">{{ equivalentEnLitres }}</span> litres d'eau en bouteille
    </p>
  </aside>
</template>

<script setup lang="ts">
  interface ImpactDuJourProps {
    consommationDuJour: string;
    equivalentEnLitres: string;
  }

  withDefaults(defineProps<ImpactDuJourProps>(), {
    consommationDuJour: '0',
    equivalentEnLitres: '0',
  });
</script>

<style scoped>
  aside {
    border-radius: 6px;
    border: 1px solid var(--blue-france-sun-113-625);
  }

  .fr-icon-drop-fill {
    color: #b3b4f9;
  }
</style>
