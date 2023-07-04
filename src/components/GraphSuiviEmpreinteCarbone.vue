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
              <Line :data="graphData" :options="graphOptions" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Line } from "vue-chartjs";
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

export default {
  name: "GraphSuiviEmpreinteCarbone",
  components: { Line },
  props: {
    graphData: {
      type: Object,
      required: true,
    },
    graphOptions: {
      type: Object,
      required: true,
    },
  },
  setup() {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);
  },
};
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
