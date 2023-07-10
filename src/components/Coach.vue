<template>
  <div class="" v-if="interactionsViewModel">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-9">
        <div class="fr-container--fluid">
          <div v-if="!isLoading" class="fr-grid-row fr-grid-row--gutters dashboard-container">
            <div
              class="fr-col-12"
              v-for="item in interactionsViewModel"
              :key="item.titre"
            >
              <InteractionCard :interaction-view-model="item" />
            </div>
          </div>
          <div v-else class="fr-grid-row fr-grid-row--gutters dashboard-container">
            <div class="fr-col-12" v-for="item in 4" :key="item">
              <CarteSkeleton />
            </div>
          </div>
        </div>
      </div>
      <div class="fr-col-12 fr-col-lg-3">
        <div v-if="!isLoading" >
          <div class="fr-grid-row fr-grid-row--gutters card-item-list-container">
            <div class="fr-col-12">
              <BilanNosGestesClimat :get-impact-value="empreinteViewModel?.bilan" />
            </div>
            <div class="fr-col-12">
              <MesResultats v-if="badgeViewModel" :badge-view-model="badgeViewModel" :score-value="10" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="fr-grid-row fr-grid-row--gutters card-item-list-container">
            <div class="fr-col-12">
              <CarteSkeleton />
            </div>
            <div class="fr-col-12">
              <CarteSkeleton />
            </div>
          </div>
        </div>
      </div>
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
import BadgeCarte from "@/components/BadgeContainer.vue";
import store from "@/store";
import Quizz from "@/components/Quiz.vue";
import CarteSkeleton from "@/components/CarteSkeleton.vue";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
import MesResultats from "@/components/MesResultats.vue";
import { DeviceType, getDeviceType } from "@/DeviceType";
import { ChargementEmpreinteUsecase } from "@/bilan/chargementEmpreinte.usecase";
import { EmpreinteRepositoryAxios } from "@/bilan/adapters/empreinteRepository.axios";
import { ChargementEmpreintePresenterImpl } from "@/bilan/adapters/chargementEmpreinte.presenter.impl";
import { ChargerInteractionsUsecase } from "@/interactions/chargerInteractions.usecase";
import { InteractionsRepositoryInMemory } from "@/interactions/adapters/interactionsRepository.inMemory";
import { InteractionsPresenterImpl, InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";
import InteractionCard from "@/components/InteractionCard.vue";
import { InteractionsRepositoryAxios } from "@/interactions/adapters/interactionsRepository.axios";
export default defineComponent({
  name: "Coach",
  methods: { getDeviceType },
  components: { InteractionCard, MesResultats, BilanNosGestesClimat, CarteSkeleton, BadgesContainer: BadgeCarte, QuizCarte, Compteur },
  computed: {
    DeviceType() {
      return DeviceType;
    },
  },
  setup() {
    const utilisateur = ref<string>();
    const compteurViewModel = ref<CompteurViewModel[]>();
    const badgeViewModel = ref<BadgeViewModel[]>();
    const quizViewModel = ref<QuizzViewModel[]>();
    const empreinteViewModel = ref<EmpreinteViewModel>();
    const interactionsViewModel = ref<InteractionViewModel[]>();
    const isLoading = ref<boolean>(true);

    function mapValueBilan(viewModel: EmpreinteViewModel) {
      empreinteViewModel.value = viewModel;
      store.commit("utilisateur/setValeurBilanCarbone", viewModel.bilan);
    }

    function mapValuesInteractions(viewModel: InteractionViewModel[]) {
      interactionsViewModel.value = viewModel;
    }
    const lancerChargementDesDonnees = () => {
      isLoading.value = true;
      const idUtilisateur = store.getters["utilisateur/getId"];
      const chargementEmpreinteUseCase = new ChargementEmpreinteUsecase(new EmpreinteRepositoryAxios());
      const chargerInteractionsUseCase = new ChargerInteractionsUsecase(new InteractionsRepositoryAxios());

      Promise.all([
        chargementEmpreinteUseCase.execute(idUtilisateur, new ChargementEmpreintePresenterImpl(mapValueBilan)),
        chargerInteractionsUseCase.execute(idUtilisateur, new InteractionsPresenterImpl(mapValuesInteractions)),
      ]).then(() => {
        isLoading.value = false;
      });
    };

    onMounted(lancerChargementDesDonnees);
    return {
      isLoading,
      utilisateur,
      badgeViewModel,
      quizViewModel,
      compteurViewModel,
      empreinteViewModel,
      interactionsViewModel,
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
  margin: 20px 0 0 0;
}

/* Disposition des éléments du dashboard sur les écrans de petite taille */
@media only screen and (max-width: 950px) {
  /*.dashboard-container {
    margin: 5px;
  }*/
}

.valeur {
  color: #161616;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
}

.card-item-list-container {
  margin-top: 20px;
}
</style>
