<template>
  <div class="fr-container">
    <h1 class="fr-h1 fr-m-0 fr-mt-4w">Bonjour {{ utilisateurStore().utilisateur.prenom }} 👋</h1>
    <p class="fr-text--xl">Réduire votre empreinte écologique : selon vos moyens, vos lieux de vie et vos envies</p>
  </div>

  <div class="fr-container fr-py-6w" v-if="universViewModel?.length < 0">
    <div>
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
  <section id="univers" class="fr-pb-6w fr-mt-4w">
    <div class="fr-container">
      <h2 class="fr-h2 fr-mb-0">Univers</h2>
      <p class="fr-text--xl">Découvrez des thèmes et débloquez de nouvelles actions.</p>
      <div class="fr-grid-row">
        <div
          class="border-radius--md shadow background--white fr-mr-4w"
          v-for="univers in universViewModel"
          :key="univers.id"
        >
          <div class="fr-p-2w">
            <img class="max-full-width border-radius--xs" :src="univers.urlImage" alt="" />
            <h3 class="fr-h6 fr-mb-2w">{{ univers.nom }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      <h2 class="fr-h2 fr-mb-0">Mes Actions</h2>
      <p class="fr-text--xl">
        Gagnez des <img width="16" src="/ic_score.svg" alt="point" /> chaque semaine avec de nouvelles actions !
      </p>
      <CoachActions
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
      <h2 class="fr-h2 fr-mb-0">Recommandé, pour vous</h2>
      <p class="fr-text--xl">Une sélection d’articles et de services, pour vous, selon vos préférences !</p>
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
  import CoachActions from '@/components/custom/Coach/CoachActions.vue';
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
  import { ListeUniversPresenterImpl, UniversViewModel } from '@/univers/adapters/listeUnivers.presenter.impl';
  import { UniversRepositoryInmemory } from '@/univers/adapters/univers.repository.inmemory';
  import { RecupererListeUniversUsecase } from '@/univers/recupererListeUnivers.usecase';

  const { recommandationTour, defiTour } = useReveal();

  const isLoading = ref<boolean>(true);
  const todoList = ref<TodoListViewModel>();
  const universViewModel = ref<UniversViewModel[]>();
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

    const chargerUniversUsecase = new RecupererListeUniversUsecase(new UniversRepositoryInmemory());

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
      chargerUniversUsecase.execute(
        new ListeUniversPresenterImpl(viewModel => (universViewModel.value = viewModel.univers)),
      ),
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
