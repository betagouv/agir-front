<template>
  <div class="fr-grid-row">
    <CarteEmpreinteDuJour :suivi-du-jour-resultats="suiviDuJourResultats" />
    <EmpreinteDuJourDetails :suivi-du-jour-resultats="suiviDuJourResultats" />
  </div>
  <br />
  <GraphSuiviEmpreinteCarbone
    :dates-du-graph="suiviDuJourResultats.suivisPrecedent.datesDesSuivis"
    :valeurs-carbone-du-graph="suiviDuJourResultats.suivisPrecedent.valeursDesSuivis"
    :moyenne-des-suivis="suiviDuJourResultats.suivisPrecedent.moyenneDesSuivis"
  />
</template>

<script lang="ts">
import CarteEmpreinteDuJour from "@/components/CarteEmpreinteDuJour.vue";
import EmpreinteDuJourDetails from "@/components/EmpreinteDuJourDetails.vue";
import { SuiviDuJourResultatsViewModel } from "@/suivi/adapters/suiviDuJour.presenter.impl";
import GraphSuiviEmpreinteCarbone from "@/components/GraphSuiviEmpreinteCarbone.vue";

export default {
  name: "SuiviDuJourResultats",
  components: { GraphSuiviEmpreinteCarbone, CarteEmpreinteDuJour, EmpreinteDuJourDetails },
  props: {
    suiviDuJourResultats: {
      type: Object as () => SuiviDuJourResultatsViewModel,
      required: true,
    },
  },
};
</script>

<style scoped></style>
