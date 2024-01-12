<template>
  <div class="fr-container fr-py-6w">
    <div>
      <h1 class="fr-h2">Agir</h1>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div v-if="todoList" class="fr-col fr-col-lg-7">
          <CoachToDo :todoList="todoList" />
        </div>
        <div class="fr-col-12 fr-col-lg-4 fr-col-offset-lg-1">
          <div v-if="!isLoading">
            <div class="fr-grid-row flex-space-between fr-mb-1w">
              <CarteScore class="fr-mr-3w" :value="utilisateurStore().score.niveau" type="niveau" />
              <CarteScore :value="utilisateurStore().score.points" type="score" />
            </div>
            <ProgressionNiveauJauge
              class="fr-mb-3w"
              :objectif="utilisateurStore().score.nombreDePointsDuNiveau"
              :valeur="utilisateurStore().score.nombreDePointsDansLeNiveau"
            />
            <BilanOnboarding />
          </div>
          <div v-else>
            <CarteSkeleton />
          </div>
        </div>
      </div>
    </div>
  </div>
  <section
    v-if="store.utilisateur.fonctionnalitesDebloquees.includes(Fonctionnalites.RECOMMANDATIONS)"
    class="fr-py-6w fr-background-contrast--grey"
    v-tour-step:1="{
      tour: recommandationTour,
      options: {
        attachTo: { on: 'top' },
        title: 'Recommandations débloquées',
        text: 'Retrouvez ici toutes vos recommandations personnalisées !',
        buttons: [
          {
            text: 'Fermer',
            action: recommandationTour.cancel,
            classes: 'fr-btn fr-btn--icon-left',
          },
        ],
      },
    }"
  >
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
  <section class="fr-py-6w background--image--coach">
    <div class="fr-container">
      <CoachChangementSituation />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
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
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import BilanOnboarding from '@/components/custom/BilanOnboarding.vue';
  import { useReveal } from '@/composables/useReveal';

  const { recommandationTour } = useReveal();

  const isLoading = ref<boolean>(true);
  const todoList = ref<TodoListViewModel>();
  const store = utilisateurStore();
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();

  function mapValuesInteractions(viewModel: RecommandationPersonnaliseeViewModel) {
    recommandationsPersonnaliseesViewModel.value = viewModel;
  }

  function mapValueBilan(viewModel: EmpreinteViewModel) {
    store.setValeurBilanCarbone(viewModel);
  }

  function mapValueTodo(viewModel: TodoListViewModel) {
    todoList.value = viewModel;
  }

  const subscriberName = 'Coach';
  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const chargerRecommandationsPersonnaliseesUsecase = new RecommandationsPersonnaliseesUsecase(
      new RecommandationsPersonnaliseesRepositoryAxios()
    );
    const chargementEmpreinteUseCase = new ChargementEmpreinteUsecase(new EmpreinteRepositoryAxios());
    const chargerTodoListUsecase = new RecupererToDoListUsecase(new ToDoListRepositoryAxios());

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
    });

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
    });

    Promise.all([
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
  };

  onMounted(lancerChargementDesDonnees);

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE);
  });
</script>
