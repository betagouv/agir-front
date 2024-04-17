<template>
  <div class="fr-container fr-py-6w">
    <div>
      <h1 class="fr-h1 fr-m-0">Réduire votre empreinte écologique</h1>
      <p class="fr-text--xl">Selon vos moyens, vos lieux de vie et vos envies</p>
      <div v-if="todoList && todoList.derniere" class="background--white border-radius--md shadow fr-p-2w fr-mb-3w">
        <p class="fr-mb-0">
          ✅ <span class="fr-text--bold">Vous avez accompli l’ensemble des missions ! </span> De nouvelles missions
          arriveront très prochainement.
        </p>
        <div id="container-survey"></div>
      </div>
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
    </div>
  </div>
  <section
    class="fr-pb-6w"
    id="defis"
    v-if="utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes('defis')"
    v-tour-step:1="{
      tour: defiTour,
      options: {
        attachTo: { on: 'top' },
        title: 'Actions débloquées',
        text: 'Retrouvez ici toutes vos actions personnalisées !',
        scrollTo: { behavior: 'smooth', block: 'center' },
      },
    }"
  >
    <div class="fr-container">
      <h2 class="fr-h2 fr-mb-0">Essayer de nouveaux usages</h2>
      <p class="fr-text--xl">
        Des propositions d'actions concrètes et faciles à mettre en oeuvre, en fonction de votre situation
      </p>
      <CoachRecommandations
        v-if="recommandationsPersonnaliseesViewModel"
        :recommandations="recommandationsPersonnaliseesViewModel.defis"
      />
    </div>
  </section>
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
      <h2 class="fr-h2 fr-mb-0">Personnaliser davantage votre expérience</h2>
      <p class="fr-text--xl">
        Mieux comprendre les enjeux environnementaux et aider Agir à mieux comprendre les vôtres
      </p>
      <CoachRecommandations
        v-if="recommandationsPersonnaliseesViewModel"
        :recommandations="recommandationsPersonnaliseesViewModel.autresRecommandations"
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
  import CoachRecommandations from './custom/Coach/CoachRecommandations.vue';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import BilanOnboarding from '@/components/custom/BilanOnboarding.vue';
  import CoachChangementSituation from '@/components/custom/Coach/CoachChangementSituation.vue';
  import CoachToDo from '@/components/custom/Coach/CoachToDo.vue';
  import CarteScore from '@/components/custom/Progression/CarteScore.vue';
  import ProgressionNiveauJauge from '@/components/custom/Progression/ProgressionNiveauJauge.vue';
  import { useReveal } from '@/composables/useReveal';
  import {
    RecommandationPersonnaliseeViewModel,
    RecommandationsPersonnaliseesPresenterImpl,
  } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import { RecommandationsPersonnaliseesRepositoryAxios } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.repository.axios';
  import { RecupererRecommandationsPersonnaliseesUsecase } from '@/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { publierEvenementHotjar, HotjarEvenement } from '@/shell/publierEvenementHotjar';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ToDoListPresenterImpl, TodoListViewModel } from '@/toDoList/adapters/toDoList.presenter.impl';
  import { ToDoListRepositoryAxios } from '@/toDoList/adapters/toDoList.repository.axios';
  import { RecupererToDoListUsecase } from '@/toDoList/recupererToDoList.usecase';
  import { ToDoListEvent, ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';

  const { recommandationTour, defiTour } = useReveal();

  const isLoading = ref<boolean>(true);
  const todoList = ref<TodoListViewModel>();
  const store = utilisateurStore();
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();
  let handleConcealEvent: () => void;

  function onRecommandationsPretesAAfficher(viewModel: RecommandationPersonnaliseeViewModel) {
    recommandationsPersonnaliseesViewModel.value = viewModel;
  }

  function mapValueTodo(viewModel: TodoListViewModel) {
    todoList.value = viewModel;
    if (todoList.value?.derniere) {
      publierEvenementHotjar(HotjarEvenement.DEBRIEF);
    }
  }

  const subscriberName = 'Coach';
  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const chargerRecommandationsPersonnaliseesUsecase = new RecupererRecommandationsPersonnaliseesUsecase(
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
        new RecommandationsPersonnaliseesPresenterImpl(onRecommandationsPretesAAfficher),
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
    handleConcealEvent = () => {
      const idUtilisateur = store.utilisateur.id;
      const chargerRecommandationsPersonnaliseesUsecase = new RecupererRecommandationsPersonnaliseesUsecase(
        new RecommandationsPersonnaliseesRepositoryAxios(),
      );
      chargerRecommandationsPersonnaliseesUsecase.execute(
        idUtilisateur,
        new RecommandationsPersonnaliseesPresenterImpl(onRecommandationsPretesAAfficher),
      );
    };
    document.getElementById('passageDeNiveau')!.addEventListener('dsfr.conceal', handleConcealEvent);
  });

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE);
    document.getElementById('passageDeNiveau')!.removeEventListener('dsfr.conceal', handleConcealEvent);
  });
</script>
