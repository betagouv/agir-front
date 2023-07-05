<template>
  <div class="fr-grid-row">
    <CarteEmpreinteDuJour :suivi-du-jour-resultats="suiviDuJourResultats" />
    <EmpreinteDuJourDetails :suivi-du-jour-alimentation="suiviDuJourAlimentation" :suivi-du-jour-transport="suiviDuJourTransport" />
  </div>
  <br />
  <GraphSuiviEmpreinteCarbone
    :dates-du-graph="suiviDuJourResultats.suivisPrecedent.datesDesSuivis"
    :valeurs-carbone-du-graph="suiviDuJourResultats.suivisPrecedent.valeursDesSuivis"
  />
  <br />
  <button class="fr-btn continue-step-button fr-btn-not-rounded share-btn-container" title="partager">Partager vos résultats</button>
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
    suiviDuJourAlimentation: {
      type: Object as () => Map<string, string>,
      required: true,
    },
    suiviDuJourTransport: {
      type: Object as () => Map<string, string>,
      required: true,
    },
    suiviDuJourResultats: {
      type: Object as () => SuiviDuJourResultatsViewModel,
      required: true,
    },
  },
};
</script>

<style scoped>
.share-btn-container {
  margin: 0 auto;
  background-color: white;
  color: #000091;
  border: 1px solid rgba(0, 0, 0, 0.19);
}

.fr-btn-not-rounded {
  border-radius: 0;
}
</style>
