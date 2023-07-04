<template>
  <div class="fr-grid-row">
    <CarteEmpreinteDuJour :empreinte-carbone-du-jour="empreinteCarboneDuJour" />
    <EmpreinteDuJourDetails :suivi-du-jour-alimentation="suiviDuJourAlimentation" :suivi-du-jour-transport="suiviDuJourTransport" />
  </div>
  <br />
  <GraphSuiviEmpreinteCarbone :graph-data="graphData" :graph-options="graphOptions" />
  <br />
  <button class="fr-btn continue-step-button fr-btn-not-rounded share-btn-container" title="partager">Partager vos résultats</button>
</template>

<script lang="ts">
import CarteEmpreinteDuJour from "@/components/CarteEmpreinteDuJour.vue";
import EmpreinteDuJourDetails from "@/components/EmpreinteDuJourDetails.vue";
import { SuiviAlimentationInput, SuiviTransportInput } from "@/suivi/envoyerSuiviDuJour.usecase";
import { ImpactCarboneDuJourViewModel } from "@/suivi/adapters/suiviDuJour.presenter.impl";
import GraphSuiviEmpreinteCarbone from "@/components/GraphSuiviEmpreinteCarbone.vue";

export default {
  name: "SuiviDuJourResultats",
  components: { GraphSuiviEmpreinteCarbone, CarteEmpreinteDuJour, EmpreinteDuJourDetails },
  props: {
    suiviDuJourAlimentation: {
      type: Object as () => SuiviAlimentationInput,
      required: true,
    },
    suiviDuJourTransport: {
      type: Object as () => SuiviTransportInput,
      required: true,
    },
    empreinteCarboneDuJour: {
      type: Object as () => ImpactCarboneDuJourViewModel,
      required: true,
    },
  },
  setup() {
    const graphData = {
      labels: ["01/04", "03/04", "06/04", "10/05", "24/06", "25/06", "26/06"],
      datasets: [
        {
          label: "Suivi du jour",
          backgroundColor: "#000091",
          borderColor: "#000091",
          pointStyle: "circle",
          data: [28, 33, 22, 21, 14, 12, 13],
        },
        {
          label: "votre moyenne",
          backgroundColor: "#000000",
          borderColor: "#000000",
          borderDash: [5, 5],
          pointStyle: false,
          data: [21, 21, 21, 21, 21, 21, 21],
        },
      ],
    };

    const graphOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
          text: "Évolution de votre impact carbone quotidien",
        },
      },
    };

    return {
      graphOptions,
      graphData,
    };
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
