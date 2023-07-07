<template>
  <div class="fr-col-12">
    <div class="col-demo">
      <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md graph-container" id="tile-6538">
        <div class="fr-grid-row">
          <div :class="'fr-col-12'">
            <div class="col-demo">
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
      </div>
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
  data() {
    const donneesDuGraph = {
      labels: this.datesDuGraph,
      datasets: [
        {
          label: "Variation des suivis par jour",
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

    const optionsDuGraph = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            font: {
              size: 15,
              weight: "bold",
              family: "Marianne,arial,sans-serif",
            },
          },
          position: "right",
          align: "start",
        },
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

    return {
      donneesDuGraph,
      optionsDuGraph,
    };
  },
});
</script>
<style scoped>
.graph-card-custom-body {
  text-align: left;
  margin: 20px 20px auto;
  width: 100%;
}

.graph-container {
  background-color: #f6f6f6;
  border-radius: 5px;
}

.graph-schema {
  height: 50vh;
}

.legend-graph-container {
  position: absolute;
  left: 50%;
  top: 59%;
  transform: translate(-50%, -59%);
  width: 80%;
  font-weight: bold;
  color: black;
}

.legend-graph-place {
  position: relative;
}
</style>
