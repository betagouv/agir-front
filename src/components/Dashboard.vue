<template>
  <h1>Dashboard de {{ utilisateur }}</h1>
  <div class="dashboard-container">
    <div class="dashboard-item">
      <Compteur v-if="compteurViewModel" :compteur-view-model="compteurViewModel" />
    </div>
    <div v-for="item in quizViewModel" :key="item.id" class="dashboard-item">
      <QuizzCarte :quiz-view-model="item"></QuizzCarte>
    </div>
    <div v-if="badgeViewModel" v-for="item in badgeViewModel" :key="item.titre" class="dashboard-item">
      <BadgeCarte :badge-view-model="item"></BadgeCarte>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementDashboardUsecase } from "@/dashboard/chargementDashboard.usecase.ts";
import { ChargementDashboardPresenterImpl } from "@/dashboard/adapters/chargementDashboard.presenter.impl.ts";
import { DashboardRepositoryAxios } from "@/dashboard/adapters/dashboardRepository.axios.ts";
import { BadgeViewModel, CompteurViewModel, DashboardViewModel, QuizzViewModel } from "@/dashboard/ports/chargementDashboard.presenter.ts";
import Compteur from "@/components/Compteur.vue";
import QuizzCarte from "@/components/QuizzCarte.vue";
import BadgeCarte from "@/components/BadgeCarte.vue";

export default defineComponent({
  name: "Dashboard",
  components: { BadgeCarte, QuizzCarte, Compteur },
  setup() {
    const utilisateur = ref<string>();
    const compteurViewModel = ref<CompteurViewModel>();
    const badgeViewModel = ref<BadgeViewModel[]>();
    const quizViewModel = ref<QuizzViewModel[]>();

    function mapValues(dashboardViewModel: DashboardViewModel) {
      utilisateur.value = dashboardViewModel.utilisateur;
      compteurViewModel.value = dashboardViewModel.compteur;
      badgeViewModel.value = dashboardViewModel.badges;
      quizViewModel.value = dashboardViewModel.quizz;
    }

    const updateConsumptionValue = async () => {
      const chargementDashboardUsecase = new ChargementDashboardUsecase(new DashboardRepositoryAxios());
      await chargementDashboardUsecase.execute(window.history.state.utilisateur, new ChargementDashboardPresenterImpl(mapValues));
    };

    onMounted(updateConsumptionValue);

    return {
      utilisateur,
      badgeViewModel,
      quizViewModel,
      compteurViewModel,
    };
  },
});
</script>

<style scoped>
.dashboard-item {
  font-family: "Arial", sans-serif;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #3b3f41;
  margin: 10px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
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

.dashboard-container {
  display: flex;
}
</style>
