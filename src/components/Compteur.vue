<template>
  <div id="card-1197" class="fr-card item-card dashboard-card-container">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h2 style="font-size:2vw;" class="fr-card__title">
          {{ compteurViewModel?.titre }}
        </h2>
        <p class="fr-card__desc">
          <p class="dashboard-item-desc">Consommation:</p>
          <span class="visually-hidden">Consommation:</span>
          <span>{{ compteurViewModel?.consommation }}</span>
          <i :class="['trend-icon', compteurViewModel?.tendancePicto]" aria-hidden="true"></i>
          <span class="visually-hidden">{{ compteurViewModel?.texte }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { CompteurViewModel } from "@/dashboard/ports/chargementDashboard.presenter.ts";

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
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.consumption {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

h3 {
  font-size: 18px;
  margin-right: 10px;
}

p {
  font-size: 24px;
  font-weight: bold;
  position: relative;
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

</style>
