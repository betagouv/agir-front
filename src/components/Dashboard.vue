<template>
  <div class="dashboard">
    <h2>Dashboard de {{ utilisateur }}</h2>
    <div class="consumption">
      <h3>Consommation:</h3>
      <p>
        <span class="visually-hidden">Consommation:</span>
        <span>{{ consumptionValue }}</span>
      </p>
      <i :class="['trend-icon', trendClass]" aria-hidden="true"></i>
      <span class="visually-hidden">{{ trendText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ChargementDashboardUsecase } from "@/dashboard/chargementDashboard.usecase.ts";
import { ChargementDashboardPresenterImpl } from "@/dashboard/adapters/chargementDashboard.presenter.impl.ts";
import { DashboardRepositoryAxios } from "@/dashboard/adapters/dashboardRepository.axios.ts";
import { DashboardViewModel } from "@/dashboard/ports/chargementDashboard.presenter.ts";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const consumptionValue = ref<string>();
    const utilisateur = ref<string>();
    const trendClass = ref<string>();
    const trendText = ref<string>();

    function mapValues(dashboardViewModel: DashboardViewModel) {
      consumptionValue.value = dashboardViewModel.consommation;
      utilisateur.value = dashboardViewModel.utilisateur;
      trendClass.value = dashboardViewModel.tendancePicto;
      trendText.value = dashboardViewModel.texte;
    }

    const updateConsumptionValue = async () => {
      const chargementDashboardUsecase = new ChargementDashboardUsecase(new DashboardRepositoryAxios());
      await chargementDashboardUsecase.execute("dodo", new ChargementDashboardPresenterImpl(mapValues));
    };

    onMounted(updateConsumptionValue);

    return {
      consumptionValue,
      utilisateur,
      trendClass,
      trendText,
    };
  },
});
</script>

<style scoped>
.dashboard {
  font-family: "Arial", sans-serif;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #3b3f41;
}

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

.trend-icon--up {
  background-image: url("@/assets/vers-le-haut.png");
}

.trend-icon--down {
  background-image: url("@/assets/vers-le-bas.png");
}
</style>
