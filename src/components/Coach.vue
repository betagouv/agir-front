<template>
  <div class="fr-container fr-py-6w">
    <div>
      <h1 class="fr-h1">Agir</h1>
      <div v-if="todoList && !todoList.derniere" class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col fr-col-lg-7">
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
      <div
        v-if="todoList?.derniere"
        v-tour-step:1="{
          tour: defiTour,
          options: {
            attachTo: { on: 'top' },
            title: 'Actions débloquées',
            text: 'Retrouvez ici toutes vos actions personnalisées !',
          },
        }"
      >
        <h2 class="fr-h2 fr-mb-0">Les actions recommandées pour vous</h2>
        <p class="fr-text--xl">En fonction de qui vous êtes et où vous en êtes</p>
        <CoachRecommandations
          v-if="recommandationsPersonnaliseesViewModel"
          :recommandations="recommandationsPersonnaliseesViewModel.defisList"
        />
      </div>
    </div>
  </div>
  <section
    id="recommandations"
    v-if="store.utilisateur.fonctionnalitesDebloquees.includes(Fonctionnalites.RECOMMANDATIONS)"
    class="fr-py-6w fr-background-contrast--grey"
    v-tour-step:1="{
      tour: recommandationTour,
      options: {
        attachTo: { on: 'top' },
        title: 'Recommandations débloquées',
        text: 'Retrouvez ici toutes vos recommandations personnalisées !',
      },
    }"
  >
    <div class="fr-container" v-if="!isLoading">
      <h2 class="fr-h2 fr-mb-0">Recommandé pour vous</h2>
      <p class="fr-text--xl">En fonction de qui vous êtes et où vous en êtes</p>
      <CoachRecommandations
        v-if="recommandationsPersonnaliseesViewModel"
        :recommandations="recommandationsPersonnaliseesViewModel.recommandationsList"
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
  import CoachToDo from '@/components/custom/Coach/CoachToDo.vue';
  import { ToDoListRepositoryAxios } from '@/toDoList/adapters/toDoList.repository.axios';
  import { ToDoListPresenterImpl, TodoListViewModel } from '@/toDoList/adapters/toDoList.presenter.impl';
  import { RecupererToDoListUsecase } from '@/toDoList/recupererToDoList.usecase';
  import { ToDoListEvent, ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import BilanOnboarding from '@/components/custom/BilanOnboarding.vue';
  import { useReveal } from '@/composables/useReveal';

  const { recommandationTour, defiTour } = useReveal();

  const isLoading = ref<boolean>(true);
  const todoList = ref<TodoListViewModel>();
  const store = utilisateurStore();
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();

  function mapValuesInteractions(viewModel: RecommandationPersonnaliseeViewModel) {
    recommandationsPersonnaliseesViewModel.value = viewModel;
  }

  function mapValueTodo(viewModel: TodoListViewModel) {
    todoList.value = viewModel;
  }

  const subscriberName = 'Coach';
  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const chargerRecommandationsPersonnaliseesUsecase = new RecommandationsPersonnaliseesUsecase(
      new RecommandationsPersonnaliseesRepositoryAxios(),
    );
    const chargerTodoListUsecase = new RecupererToDoListUsecase(new ToDoListRepositoryAxios());

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
    });

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
    });

    Promise.all([
      chargerRecommandationsPersonnaliseesUsecase.execute(
        idUtilisateur,
        new RecommandationsPersonnaliseesPresenterImpl(mapValuesInteractions),
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

  onMounted(() => {
    lancerChargementDesDonnees();

    document.getElementById('passageDeNiveau')!.addEventListener('dsfr.conceal', () => {
      ToDoListEventBusImpl.getInstance().publish(ToDoListEvent.TODO_A_ETE_TERMINEE);
    });
  });

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE);
    document.getElementById('passageDeNiveau')!.removeEventListener('dsfr.conceal', () => {});
  });
</script>
