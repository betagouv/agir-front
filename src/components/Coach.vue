<template>
  <div v-if="!isLoading" class="fr-grid-row fr-grid-row--gutters dashboard-container">
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3" v-for="item in compteurViewModel" :key="item.titre">
      <Compteur :compteur-view-model="item" />
    </div>
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3" v-for="item in quizViewModel" :key="item.id">
      <QuizCarte :quiz-view-model="item" />
    </div>
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3" v-for="item in badgeViewModel" :key="item.titre">
      <BadgeCarte :badge-view-model="item" />
    </div>
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3">
      <BilanNosGestesClimat :get-impact-value="getImpactValue" />
    </div>
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3">
      Votre score 10 <img src="../../public/leaf.svg" alt="" />

      Badges obtenus
    </div>
  </div>
  <div v-else class="fr-grid-row fr-grid-row--gutters dashboard-container">
    <div v-for="item in 3" class="fr-col-12 fr-col-md-4 fr-col-lg-3">
      <CarteSkeleton />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementDashboardUsecase } from "@/dashboard/chargementDashboard.usecase";
import { ChargementDashboardPresenterImpl } from "@/dashboard/adapters/chargementDashboard.presenter.impl";
import { DashboardRepositoryAxios } from "@/dashboard/adapters/dashboardRepository.axios";
import { BadgeViewModel, CompteurViewModel, DashboardViewModel, EmpreinteViewModel, QuizzViewModel } from "@/dashboard/ports/chargementDashboard.presenter";
import Compteur from "@/components/Compteur.vue";
import QuizCarte from "@/components/QuizCarte.vue";
import BadgeCarte from "@/components/BadgeCarte.vue";
import store from "@/store";
import Quizz from "@/components/Quiz.vue";
import CarteSkeleton from "@/components/CarteSkeleton.vue";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";

export default defineComponent({
  name: "Coach",
  components: { BilanNosGestesClimat, CarteSkeleton, Quizz, BadgeCarte, QuizCarte, Compteur },
  computed: {
    getImpactValue() {
      if (this.empreinteViewModel) {
        return parseFloat(this.empreinteViewModel.bilan).toFixed(2);
      }
    },
  },
  setup() {
    const utilisateur = ref<string>();
    const compteurViewModel = ref<CompteurViewModel[]>();
    const badgeViewModel = ref<BadgeViewModel[]>();
    const quizViewModel = ref<QuizzViewModel[]>();
    const empreinteViewModel = ref<EmpreinteViewModel>();
    const isLoading = ref<boolean>(true);
    function mapValues(dashboardViewModel: DashboardViewModel) {
      utilisateur.value = dashboardViewModel.utilisateur;
      compteurViewModel.value = dashboardViewModel.compteurs;
      badgeViewModel.value = dashboardViewModel.badges;
      quizViewModel.value = dashboardViewModel.quizz;
      quizViewModel.value = dashboardViewModel.quizz;
      empreinteViewModel.value = dashboardViewModel.empreinte;
      isLoading.value = false;
    }

    const updateConsumptionValue = async () => {
      isLoading.value = true;
      const chargementDashboardUsecase = new ChargementDashboardUsecase(new DashboardRepositoryAxios());
      const username = store.getters["utilisateur/getUtilisateur"];
      await chargementDashboardUsecase.execute(username, new ChargementDashboardPresenterImpl(mapValues));
    };

    onMounted(updateConsumptionValue);

    return {
      isLoading,
      utilisateur,
      badgeViewModel,
      quizViewModel,
      compteurViewModel,
      empreinteViewModel,
    };
  },
});
</script>

<style scoped>
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
  margin: 20px;
}

/* Disposition des éléments du dashboard sur les écrans de petite taille */
@media only screen and (max-width: 950px) {
  .dashboard-container {
    margin: 5px;
  }
}

.card-item-container {
  align-items: center;
  text-align: center;
}

.dashboard-card-item {
  border: 2px solid black;
  border-radius: 2px;
}

.fr-tile {
  box-shadow: unset;
}

.impact-value {
  color: #161616;
  font-size: 2rem;
}

.valeur {
  color: #161616;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
}
</style>
