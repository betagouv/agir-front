<template>
  <div class="fr-col-12">
    <div class="col-demo">
      <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md graph-container" id="tile-6538">
        <div class="graph-card-custom-body">
          <div class="fr-tile__title">
            <p style="font-size: 2.5vh">Évolution de votre impact carbone</p>
          </div>
          <br />
          <div class="fr-tile__desc">
            <div class="graph-schema">
              <LineChart :chartData="donneesDuGraph" :options="optionsDuGraph" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default defineComponent({
  name: "GraphSuiviEmpreinteCarbone",
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
  },
  data() {
    const donneesDuGraph = {
      labels: this.datesDuGraph,
      datasets: [
        {
          label: "Suivi du jour",
          backgroundColor: "#000091",
          borderColor: "#000091",
          pointStyle: "circle" as const,
          data: this.valeursCarboneDuGraph,
        },
        {
          label: "votre moyenne",
          backgroundColor: "#000000",
          borderColor: "#000000",
          borderDash: [5, 5],
          pointStyle: false as const,
          data: [21, 21, 21, 21, 21, 21, 21],
        },
      ],
    };

    const optionsDuGraph = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    return { donneesDuGraph, optionsDuGraph };
  },
  setup() {},
});
</script>
<style scoped>
.graph-card-custom-body {
  text-align: left;
  margin: 20px auto;
  width: 90%;
}

.graph-container {
  background-color: #f6f6f6;
  border-radius: 5px;
}

.graph-schema {
  height: 50vh;
}
</style>
