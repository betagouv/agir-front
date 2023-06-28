<template>
  <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item current-day-impact-container" id="tile-6538">
    <div class="fr-tile__body card-item-container">
      <h3 class="fr-tile__desc current-day-impact-title">Impact du jour</h3>
      <p class="valeur">
        <span class="current-day-impact">{{ consommationDuJour }}</span>
        <span style="font-weight: bold">&NonBreakingSpace;kg&NonBreakingSpace;</span>
        <span>de CO₂-e</span>
      </p>
      <div class="fr-tile__desc">
        <p class="current-day-impact-desc">Autant d'émissions que pour fabriquer</p>
        <div style="display: flex">
          <!--TO DO : Replace with the right drop logo-->
          <span style="color: #b3b4f9" class="fr-icon-drop-fill" aria-hidden="true"></span>
          <!--****************************************-->
          <p class="current-day-impact-equivalent">{{ equivalentEnLitres }}</p>
          <p class="current-day-impact-equivalent-desc">litres d'eau en bouteille</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImpactDuJour",
  props: {
    consommationDuJour: {
      type: String as () => string,
      required: true,
      default: "0",
    },
    equivalentEnLitres: {
      type: String as () => string,
      required: true,
      default: "0",
    },
  },
  methods: {},
});
</script>
<style scoped>
.card-item-container {
  align-items: flex-start;
  text-align: left;
}

.dashboard-card-item {
  border: 1px solid #e8e8e8;
  border-radius: 5px;
}

.fr-tile {
  box-shadow: unset;
}

.current-day-impact {
  font-weight: bold;
  font-size: 25px;
}

.current-day-impact-title {
  color: white;
  font-size: 2vh;
}

.current-day-impact-container {
  background-color: #6a6af4;
  color: white;
}

.current-day-impact-desc {
  font-weight: bold;
  font-size: 1.2vh;
  margin: 5px;
}

.current-day-impact-equivalent {
  margin-left: 5px;
}

.current-day-impact-equivalent-desc {
  margin-left: 5px;
  font-weight: bold;
  font-size: 1.8vh;
}
</style>
