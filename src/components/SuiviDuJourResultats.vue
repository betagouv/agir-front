<template>
  <div class="fr-grid-row">
    <CarteEmpreinteDuJourHaut v-if="impactCarbonDuJour.suiviDuJOur > 7" :impact-carbon-du-jour="impactCarbonDuJour" />
    <CarteEmpreinteDuJourBas v-else :impact-carbon-du-jour="impactCarbonDuJour" />
    <EmpreinteDuJourDetails :impact-carbon-du-jour="impactCarbonDuJour" />
  </div>
  <br />
  <div style="width: auto; height: 50vh">
    <Line :data="graphData" :options="graphOptions" />
  </div>
  <br />
  <button class="fr-btn continue-step-button fr-btn-not-rounded share-btn-container" title="partager">Partager vos résultats</button>
</template>

<script lang="ts">
import { Line } from "vue-chartjs";
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import CarteEmpreinteDuJourHaut from "@/components/CarteEmpreinteDuJourHaut.vue";
import CarteEmpreinteDuJourBas from "@/components/CarteEmpreinteDuJourBas.vue";
import { ImpactCarbonDuJour } from "@/suivi/ImpactCarbone";
import EmpreinteDuJourDetails from "@/components/EmpreinteDuJourDetails.vue";

export default {
  name: "SuiviDuJourResultats",
  components: { CarteEmpreinteDuJourHaut, EmpreinteDuJourDetails, Line, CarteEmpreinteDuJourBas },
  props: {
    impactCarbonDuJour: {
      type: Object as () => ImpactCarbonDuJour,
      required: true,
    },
  },
  setup() {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

    const graphData = {
      labels: ["01/04", "03/04", "06/04", "10/05", "24/06", "25/06", "26/06"],
      datasets: [
        {
          label: "Suivi du jour",
          backgroundColor: "#000091",
          data: [28, 33, 22, 21, 14, 12, 13],
          tension: 0,
        },
        {
          label: "Data min",
          backgroundColor: "#000091",
          data: [11, 11, 11, 11, 11, 11, 11],
          tension: 0,
        },
        {
          label: "Data max",
          backgroundColor: "#000091",
          data: [21, 21, 21, 21, 21, 21, 21],
          tension: 0,
        },
      ],
    };

    const graphOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Évolution de votre impact carbone quotidien",
        },
      },
      elements: {
        point: {
          pointStyle: false,
        },
        line: {
          borderDashOffset: 1.5,
          borderDash: [5, 15],
          borderColor: "#000091",
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
</style>
