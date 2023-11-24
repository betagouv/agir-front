<template>
  <div class="fr-container fr-py-6w">
    <div>
      <h1 class="fr-h2">Le coach</h1>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div v-if="todoList" class="fr-col fr-col-lg-7">
          <CoachToDo :todoList="todoList" />
        </div>
        <div class="fr-col-12 fr-col-lg-4 fr-col-offset-lg-1">
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
  <section class="fr-py-6w fr-background-contrast--grey">
    <div class="fr-container" v-if="!isLoading">
      <CoachRecommandations
        v-if="recommandationsPersonnaliseesViewModel"
        :recommandations="recommandationsPersonnaliseesViewModel"
      />
    </div>
    <div class="fr-container" v-else>
      <CarteSkeleton />
    </div>
  </section>
  <section class="fr-py-6w background--bleu-dark">
    <div class="fr-container">
      <CoachChangementSituation />
    </div>
  </section>
  <!-- Exemple utilisation bouton modale -->
  <!-- <button class="fr-btn" data-fr-opened="false" aria-controls="passageDeNiveau">Modale avec zone d'action</button> -->
  <Teleport to="body">
    <Modale titre="Passage de niveau" label="Modale de passage de niveau" id="passageDeNiveau">
      <CarteScore :value="1" type="niveau" class="fr-mb-2w" />
      <div class="text--center">
        <button class="fr-btn fr-btn--icon-right fr-icon-arrow-right-line" aria-controls="passageDeNiveau">
          Continuer
        </button>
      </div>
    </Modale>
  </Teleport>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { ScoreViewModel } from '@/score/ports/chargementScorePresenter';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import { ChargementScoreUsecase } from '@/score/chargementScoreUsecase';
  import { ScoreRepositoryAxios } from '@/score/adapters/scoreRepository.axios';
  import { ChargementScorePresenterImpl } from '@/score/adapters/chargementScorePresenterImpl';
  import { utilisateurStore } from '@/store/utilisateur';
  import CoachChangementSituation from '@/components/custom/Coach/CoachChangementSituation.vue';
  import CarteScore from '@/components/custom/Progression/CarteScore.vue';
  import ProgressionNiveauJauge from '@/components/custom/Progression/ProgressionNiveauJauge.vue';
  import CoachRecommandations from './custom/Coach/CoachRecommandations.vue';
  import { RecommandationsPersonnaliseesUsecase } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
  import { RecommandationsPersonnaliseesRepositoryAxios } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.repository.axios';
  import {
    RecommandationPersonnaliseeViewModel,
    RecommandationsPersonnaliseesPresenterImpl,
  } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import {
    ChargementEmpreintePresenterImpl,
    EmpreinteViewModel,
  } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';
  import { ChargementEmpreinteUsecase } from '@/bilan/chargementEmpreinte.usecase';
  import { EmpreinteRepositoryAxios } from '@/bilan/adapters/empreinteRepository.axios';
  import CoachToDo from '@/components/custom/Coach/CoachToDo.vue';
  import { ToDoListRepositoryAxios } from '@/toDoList/adapters/toDoList.repository.axios';
  import { ToDoListPresenterImpl, TodoListViewModel } from '@/toDoList/adapters/toDoList.presenter.impl';
  import { RecupererToDoListUsecase } from '@/toDoList/recupererToDoList.usecase';
  import { ToDoListEvent, ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import Modale from '@/components/custom/Modale.vue';

  const scoreViewModel = ref<ScoreViewModel>();
  const isLoading = ref<boolean>(true);
  const todoList = ref<TodoListViewModel>();
  const store = utilisateurStore();
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();

  function mapValuesInteractions(viewModel: RecommandationPersonnaliseeViewModel) {
    recommandationsPersonnaliseesViewModel.value = viewModel;
  }

  function mapValuesScore(viewModel: ScoreViewModel) {
    scoreViewModel.value = viewModel;
    store.setScore(viewModel.score);
  }

  function mapValueBilan(viewModel: EmpreinteViewModel) {
    store.setValeurBilanCarbone(viewModel);
  }

  function mapValueTodo(viewModel: TodoListViewModel) {
    todoList.value = viewModel;
  }

  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const chargerRecommandationsPersonnaliseesUsecase = new RecommandationsPersonnaliseesUsecase(
      new RecommandationsPersonnaliseesRepositoryAxios()
    );
    const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios());
    const chargementEmpreinteUseCase = new ChargementEmpreinteUsecase(new EmpreinteRepositoryAxios());
    const chargerTodoListUsecase = new RecupererToDoListUsecase(new ToDoListRepositoryAxios());

    ToDoListEventBusImpl.getInstance().subscribe(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
    });

    Promise.all([
      chargerScoreUseCase.execute(idUtilisateur, new ChargementScorePresenterImpl(mapValuesScore)),
      chargementEmpreinteUseCase.execute(idUtilisateur, new ChargementEmpreintePresenterImpl(mapValueBilan)),
      chargerRecommandationsPersonnaliseesUsecase.execute(
        idUtilisateur,
        new RecommandationsPersonnaliseesPresenterImpl(mapValuesInteractions)
      ),
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo)),
    ])
      .then(() => {
        isLoading.value = false;
      })
      .catch(() => {
        isLoading.value = false;
      });

    // TO USE LATER
    // window.addEventListener('DOMContentLoaded', _ => {
    //   const dialog = document.querySelector('dialog');
    //   window.dsfr(dialog).modal.disclose();
    // });
  };

  onMounted(lancerChargementDesDonnees);
</script>
