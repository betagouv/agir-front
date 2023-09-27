<template>
  <div class="background--gris fr-p-3w border-radius--md">
    <h3 class="fr-h4 text--gris">Addition carbone du jour</h3>
    <ul class="fr-m-0 fr-p-0">
      <li
        v-for="(impactCarboneItem, index) in suiviDuJourResultats.additionCarbone"
        :key="impactCarboneItem.valeur"
        class="fr-grid-row fr-text--xs"
        :class="[{ 'text--bold fr-text--sm': index < 3 }]"
      >
        <span class="fr-col-3">
          {{ impactCarboneItem.impactCarbone }}
        </span>
        <span class="fr-col-9">
          {{ impactCarboneItem.valeur }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { SuiviDuJourResultatsViewModel } from '@/suivi/adapters/suiviDuJour.presenter.impl';

  defineProps<{
    suiviDuJourResultats: SuiviDuJourResultatsViewModel;
  }>();
</script>
