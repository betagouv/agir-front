<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-2w">
    <CarteEmpreinteDuJour :suivi-du-jour-resultats="suiviDuJourResultats" />
    <EmpreinteDuJourDetails :suivi-du-jour-resultats="suiviDuJourResultats" />
  </div>
  <GraphSuiviEmpreinteCarbone
    :dates-du-graph="suiviDuJourResultats.suivisPrecedent.datesDesSuivis"
    :valeurs-carbone-du-graph="suiviDuJourResultats.suivisPrecedent.valeursDesSuivis"
    :moyenne-des-suivis="suiviDuJourResultats.suivisPrecedent.moyenneDesSuivis"
  />
</template>

<script setup lang="ts">
  import CarteEmpreinteDuJour from "@/components/CarteEmpreinteDuJour.vue";
  import EmpreinteDuJourDetails from "@/components/EmpreinteDuJourDetails.vue";
  import { SuiviDuJourResultatsViewModel } from "@/suivi/adapters/suiviDuJour.presenter.impl";
  import GraphSuiviEmpreinteCarbone from "@/components/GraphSuiviEmpreinteCarbone.vue";

  defineProps<{
    suiviDuJourResultats: SuiviDuJourResultatsViewModel
  }>();
</script>
