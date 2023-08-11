<template>
  <div v-if="interactionsViewModel">
    <h1 class="fr-h2">Les actions du jour</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col fr-col-lg-8">
        <div v-if="!isLoading">
          <InteractionCard
            v-for="item in interactionsViewModel"
            :key="item.titre"
            class="fr-mb-4w"
            :interaction-view-model="item"
            @refresh-interactions="lancerChargementDesDonnees"
          />
        </div>
        <div v-else>
          <CarteSkeleton class="fr-mb-4w" v-for="item in 4" :key="item" />
        </div>
      </div>
      <div class="fr-col-12 fr-col-lg-4">
        <div v-if="!isLoading">
          <BilanNosGestesClimat v-if="empreinteViewModel" class="fr-mb-3w" :get-impact-value="empreinteViewModel" />
          <MesResultats v-if="scoreViewModel" :badge-view-model="scoreViewModel.badges" :score-value="scoreViewModel.score" />
        </div>
        <div v-else>
          <CarteSkeleton class="fr-mb-3w" />
          <CarteSkeleton />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ScoreViewModel } from "@/score/ports/chargementScorePresenter";
import CarteSkeleton from "@/components/CarteSkeleton.vue";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
import MesResultats from "@/components/MesResultats.vue";
import { DeviceType, getDeviceType } from "@/DeviceType";
import { ChargementEmpreinteUsecase } from "@/bilan/chargementEmpreinte.usecase";
import { EmpreinteRepositoryAxios } from "@/bilan/adapters/empreinteRepository.axios";
import { ChargementEmpreintePresenterImpl, EmpreinteViewModel } from "@/bilan/adapters/chargementEmpreinte.presenter.impl";
import { ChargerInteractionsUsecase } from "@/interactions/chargerInteractions.usecase";
import { InteractionsPresenterImpl, InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";
import InteractionCard from "@/components/InteractionCard.vue";
import { InteractionsRepositoryAxios } from "@/interactions/adapters/interactionsRepository.axios";
import { ChargementScoreUsecase } from "@/score/chargementScoreUsecase";
import { ScoreRepositoryAxios } from "@/score/adapters/scoreRepository.axios";
import { ChargementScorePresenterImpl } from "@/score/adapters/chargementScorePresenterImpl";
import { utilisateurStore } from "@/store/utilisateur";

export default defineComponent({
  name: "Coach",
  methods: { getDeviceType },
  components: { InteractionCard, MesResultats, BilanNosGestesClimat, CarteSkeleton },
  computed: {
    DeviceType() {
      return DeviceType;
    },
  },
  setup() {
    const utilisateur = ref<string>();
    const empreinteViewModel = ref<EmpreinteViewModel>();
    const interactionsViewModel = ref<InteractionViewModel[]>();
    const scoreViewModel = ref<ScoreViewModel>();
    const isLoading = ref<boolean>(true);
    const store = utilisateurStore();
    function mapValueBilan(viewModel: EmpreinteViewModel) {
      empreinteViewModel.value = viewModel;
      store.setValeurBilanCarbone(viewModel);
    }

    function mapValuesInteractions(viewModel: InteractionViewModel[]) {
      interactionsViewModel.value = viewModel;
    }

    function mapValuesScore(viewModel: ScoreViewModel) {
      scoreViewModel.value = viewModel;
      store.setScore(viewModel.score);
    }

    const lancerChargementDesDonnees = () => {
      isLoading.value = true;
      const idUtilisateur = store.id;
      const chargementEmpreinteUseCase = new ChargementEmpreinteUsecase(new EmpreinteRepositoryAxios());
      const chargerInteractionsUseCase = new ChargerInteractionsUsecase(new InteractionsRepositoryAxios());
      const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios());
      Promise.all([
        chargerScoreUseCase.execute(idUtilisateur, new ChargementScorePresenterImpl(mapValuesScore)),
        chargementEmpreinteUseCase.execute(idUtilisateur, new ChargementEmpreintePresenterImpl(mapValueBilan)),
        chargerInteractionsUseCase.execute(idUtilisateur, new InteractionsPresenterImpl(mapValuesInteractions)),
      ])
        .then(() => {
          isLoading.value = false;
        })
        .catch(() => {
          isLoading.value = false;
        });
    };

    onMounted(lancerChargementDesDonnees);
    return {
      isLoading,
      utilisateur,
      empreinteViewModel,
      interactionsViewModel,
      lancerChargementDesDonnees,
      scoreViewModel,
    };
  },
});
</script>
