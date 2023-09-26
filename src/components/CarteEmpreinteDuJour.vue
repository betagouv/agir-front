<template>
  <div class="background-bleu-light text--bleu fr-p-3w border-radius--md">
    <h3 class="fr-h4 text--bleu">Impact carbone du jour</h3>
    <p>
      <span class="text--bold text--4xl">+{{ suiviDuJourResultats.impactCarbonDuJour.valeur }}</span>
      <span class="text--bold">&nbsp;kg&nbsp;</span>
      <span>de CO₂-e</span>
      <span class="fr-ml-1v fr-icon-information-line" aria-hidden="true"></span>
    </p>
    <div class="fr-grid-row--middle fr-grid-row">
      <span :class="suiviDuJourResultats.impactCarbonDuJour.pictoSens" class="fr-mr-1v" aria-hidden="true"></span>
      <div>
        <div class="text--bold">{{ suiviDuJourResultats.impactCarbonDuJour.commentaire }}</div>
        <span class="text--bold">{{ suiviDuJourResultats.impactCarbonDuJour.variation }}</span>
        <span class="fr-text--xs">&nbsp;kg CO₂-e par rapport au suivi précédent</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SuiviDuJourResultatsViewModel } from '@/suivi/adapters/suiviDuJour.presenter.impl';

  defineProps<{
    suiviDuJourResultats: SuiviDuJourResultatsViewModel;
  }>();
</script>
