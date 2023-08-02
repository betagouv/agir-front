<template>
  <div class="fr-p-3w background-gris">
    <h2 class="fr-h5">Évolution de votre impact carbone</h2>
    <LineChart :chartData="getDonneesDuGraph" :options="getOptionsDuGraph" />
    <div class="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mt-2w">
      <span class="fr-text--sm fr-mb-0">Votre moyenne</span>
      <div class="legende-graphique legende-graphique--blue"></div>
      <div class="fr-text--sm fr-mb-0">Variation des suivis</div>
      <div class="legende-graphique legende-graphique--dashed"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { DeviceType, getDeviceType } from "@/DeviceType";

Chart.register(...registerables);

export default defineComponent({
  name: "GraphSuiviEmpreinteCarbone",
  methods: { getDeviceType },
  computed: {
    DeviceType() {
      return DeviceType;
    },
    getDate() {
      console.log("date du graph", this.datesDuGraph);

      return this.datesDuGraph;
    },

    getDonneesDuGraph() {      
      return {
        labels: this.datesDuGraph,
        datasets: [
          {
            label: "Variation des suivis",
            backgroundColor: "#000091",
            borderColor: "#000091",
            pointStyle: "circle" as const,
            data: this.valeursCarboneDuGraph,
          },
          {
            label: "Votre moyenne",
            backgroundColor: "#f6f6f6",
            borderColor: "#000000",
            borderDash: [5, 5],
            pointStyle: false as const,
            data: this.moyenneDesSuivis,
          },
        ],
      };
    },
    getOptionsDuGraph() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            border: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      };
    },
  },
  components: { LineChart },
  props: {
    datesDuGraph: {
      type: Object as () => string[],
      required: true,
    },
    valeursCarboneDuGraph: {
      type: Object as () => number[],
      required: true,
    },
    moyenneDesSuivis: {
      type: Object as () => number[],
      required: true,
    },
  },
});
</script>

<style scoped>
  .legende-graphique {
    width: 3rem;
    height: 0;
    margin: 0 1rem 0 .5rem;
  }
  .legende-graphique--blue {
    border: 4px solid #000091;
  }

  .legende-graphique--dashed {
    border: 4px dashed #000000;
  }
</style>
