<template>
  <div class="fr-container fr-py-6w">
    <div>
      <h1 class="fr-h2">Les actions du jour</h1>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col fr-col-lg-8">
          <ul v-if="!isLoading" class="list-style-none fr-p-0 fr-m-0">
            <li v-for="item in interactionsViewModel" :key="item.titre" class="fr-mb-2w">
              <InteractionCard
                :key="item.titre"
                :interaction-view-model="item"
                :on-interaction-click="interactionAEteCliquee"
                @refresh-interactions="lancerChargementDesDonnees"
              />
            </li>
          </ul>
          <div v-else>
            <CarteSkeleton class="fr-mb-4w" v-for="item in 4" :key="item" />
          </div>
        </div>
        <div class="fr-col-12 fr-col-lg-4">
          <div v-if="!isLoading">
            <div class="fr-grid-row flex-space-between fr-mb-1w">
              <CarteScore class="fr-mr-3w" :value="1" type="niveau" />
              <CarteScore v-if="scoreViewModel" :value="scoreViewModel.score" type="score" />
            </div>
            <ProgressionNiveauJauge class="fr-mb-1w" :objectif="24" :valeur="12" />
          </div>
          <div v-else>
            <CarteSkeleton />
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="fr-py-6w background--bleu-dark">
    <div class="fr-container">
      <CoachChangementSituation />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { ScoreViewModel } from '@/score/ports/chargementScorePresenter';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import { ChargerInteractionsUsecase } from '@/interactions/chargerInteractions.usecase';
  import { InteractionsPresenterImpl, InteractionViewModel } from '@/interactions/adapters/interactions.presenter.impl';
  import InteractionCard from '@/components/custom/InteractionCard.vue';
  import { InteractionsRepositoryAxios } from '@/interactions/adapters/interactionsRepository.axios';
  import { ChargementScoreUsecase } from '@/score/chargementScoreUsecase';
  import { ScoreRepositoryAxios } from '@/score/adapters/scoreRepository.axios';
  import { ChargementScorePresenterImpl } from '@/score/adapters/chargementScorePresenterImpl';
  import { utilisateurStore } from '@/store/utilisateur';
  import { CliquerInteractionUsecase } from '@/interactions/cliquerInteraction.usecase';
  import CoachChangementSituation from '@/components/custom/Coach/CoachChangementSituation.vue';
  import CarteScore from '@/components/custom/Progression/CarteScore.vue';
  import ProgressionNiveauJauge from '@/components/custom/Progression/ProgressionNiveauJauge.vue';

  const interactionsViewModel = ref<InteractionViewModel[]>();
  const scoreViewModel = ref<ScoreViewModel>();
  const isLoading = ref<boolean>(true);
  const store = utilisateurStore();

  const emit = defineEmits<{
    (event: 'refreshInteractions'): void;
  }>();

  function mapValuesInteractions(viewModel: InteractionViewModel[]) {
    interactionsViewModel.value = viewModel;
  }

  function mapValuesScore(viewModel: ScoreViewModel) {
    scoreViewModel.value = viewModel;
    store.setScore(viewModel.score);
  }

  const interactionAEteCliquee = (interaction: InteractionViewModel) => {
    const store = utilisateurStore();
    const idUtilisateur = store.utilisateur.id;
    const useCase = new CliquerInteractionUsecase(new InteractionsRepositoryAxios());
    useCase.execute(idUtilisateur, interaction.id, interaction.type).then(() => {
      emit('refreshInteractions');
    });
    store.setInteractionEnCours(interaction);
  };

  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const chargerInteractionsUseCase = new ChargerInteractionsUsecase(new InteractionsRepositoryAxios());
    const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios());
    Promise.all([
      chargerScoreUseCase.execute(idUtilisateur, new ChargementScorePresenterImpl(mapValuesScore)),
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
</script>
