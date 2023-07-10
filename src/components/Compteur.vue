<template>
  <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
    <div class="fr-tile__body card-item-container">
      <h3 class="fr-tile__desc">
        {{ compteurViewModel?.titre }}
      </h3>
      <br />
      <h4 class="fr-tile__title">Consommation :</h4>
      <div class="fr-tile__title">
        <span>{{ compteurViewModel?.consommation }}</span>
        <i :class="['trend-icon', compteurViewModel?.tendancePicto]" aria-hidden="true"></i>
        <span class="visually-hidden">{{ compteurViewModel?.texte }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { CompteurViewModel } from "@/score/ports/chargementScorePresenter";

export default defineComponent({
  name: "Compteur",
  props: {
    compteurViewModel: {
      type: Object as () => CompteurViewModel,
      required: true,
      default: undefined,
    },
  },
});
</script>
<style scoped>
.consumption {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
}

.trend-icon {
  width: 24px;
  height: 24px;
  margin-left: 10px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
}

.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
}

.trend-icon--up {
  background-image: url("@/assets/vers-le-haut.png");
}

.trend-icon--down {
  background-image: url("@/assets/vers-le-bas.png");
}

.item-card {
  border-radius: 5px;
  border: 2px black solid;
}

.dashboard-item-desc {
  font-size: 15px;
}

.card-item-container {
  align-items: center;
  text-align: center;
}
</style>
