<template>
  <ul class="fr-px-2w list-style-none liste-categories fr-pb-3w fr-my-0">
    <li
      v-for="categorie in detailConsommations"
      :key="categorie.label"
      class="custom-disc flex align-items--center"
      :style="getDiscStyle(categorie.color)"
    >
      <div class="flex flex-space-between full-width align-items--baseline">
        <span class="fr-text--sm fr-mb-0">
          {{ categorie.label }}
        </span>
        <span class="text--bold">{{ categorie.pourcentage }}</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import { ResultatWWViewModel } from '@/domaines/simulationWattWatchers/adapters/resultatWattWatchers.presenter.impl';

  defineProps<{
    detailConsommations: ResultatWWViewModel['detailConsommations'];
  }>();

  const getDiscStyle = (color: string) => ({
    '--disc-color': color,
  });
</script>

<style scoped>
  .custom-disc::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 9px;
    border-radius: 12px;
    background-color: var(--disc-color, #0a76f6);
    margin-right: 0.75rem;
  }

  .liste-categories {
    columns: 1;

    @media (min-width: 32rem) {
      columns: 2;
    }
  }
</style>
