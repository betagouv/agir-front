<template>
  <div class="fr-pt-5w fr-px-5w fr-grid-row">
    <p class="fr-col-6 fr-text--sm">
      <span class="display-block text--3xl text--bold fr-mb-1w fr-py-3v">{{ economieActuelle }}€</span>
      économisés
      <span class="display-block text--gris-light">par an</span>
    </p>

    <p class="fr-col-6 fr-text--sm">
      <span class="display-inline-block text--3xl text--bold fr-mb-1w prix-highlight fr-py-3v fr-px-1w"
        >{{ economiePossible }}€</span
      >
      économies possibles
      <span class="display-block text--gris-light">par an</span>
    </p>
  </div>

  <div class="fr-pb-2w fr-px-5w">
    <BarreDeProgression
      label=""
      :value="economieActuelle"
      :value-max="economiePossible"
      couleur="#EAB420"
      couleur-background="#F8EED1"
    />
  </div>
</template>

<script lang="ts" setup>
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import { ResultatWWViewModel } from '@/domaines/wattWatchers/ports/wattWatchers.repository';

  defineProps<{
    economiePossible: ResultatWWViewModel['economiePotentielle'];
    economieActuelle: ResultatWWViewModel['economieActuelle'];
  }>();
</script>

<style scoped>
  .prix-highlight {
    background-color: #ffefc2;
    color: #502400;
    border-radius: 1rem;
  }
</style>
