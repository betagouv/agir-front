<template>
  <div class="fr-container">
    <h1 class="fr-h1 fr-m-0 fr-mt-4w">Bonjour {{ utilisateurStore().utilisateur.prenom }} 👋</h1>
    <p class="fr-text--xl">Réduire votre empreinte écologique : selon vos moyens, vos lieux de vie et vos envies</p>
  </div>

  <div class="fr-container fr-py-6w">
    <div>
      <div v-if="todoList && todoList.derniere" class="background--white border-radius--md shadow fr-p-2w">
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
        <div class="fr-col-12 fr-col-lg-4 fr-col-offset-lg-1">Une illu</div>
      </div>
    </div>
  </div>
  <section
    v-if="universViewModel && utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes('univers')"
    id="univers"
    class="fr-py-6w"
  >
    <div class="fr-container">
      <CoachUnivers :universViewModel="universViewModel" />
    </div>
  </section>
  <section
    class="fr-py-6w background--white"
    id="defis"
    v-if="
      utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes('defis') &&
      defisViewModel &&
      defisViewModel.length > 0
    "
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
      <ActionListe :defis="defisViewModel" />
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
  import ActionListe from '@/components/custom/Action/ActionListe.vue';
  import CoachChangementSituation from '@/components/custom/Coach/CoachChangementSituation.vue';
  import CoachToDo from '@/components/custom/Coach/CoachToDo.vue';
  import CoachUnivers from '@/components/custom/Coach/CoachUnivers.vue';
  import { useReveal } from '@/composables/useReveal';
  import { DefiRepositoryAxios } from '@/domaines/defi/adapters/defi.repository.axios';
  import {
    DefiDescriptionViewModel,
    ListeDefisDescriptionPresenterImpl,
  } from '@/domaines/defi/adapters/listeDefisDescription.presenter.impl';
  import { RecupererDefisEnCoursOuAFaireUsecase } from '@/domaines/defi/recupererDefisEnCoursOuAFaire.usecase';
  import {
    RecommandationPersonnaliseeViewModel,
    RecommandationsPersonnaliseesPresenterImpl,
  } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import { RecommandationsPersonnaliseesRepositoryAxios } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.repository.axios';
  import { RecupererRecommandationsPersonnaliseesUsecase } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';
  import { ToDoListPresenterImpl, TodoListViewModel } from '@/domaines/toDoList/adapters/toDoList.presenter.impl';
  import { ToDoListRepositoryAxios } from '@/domaines/toDoList/adapters/toDoList.repository.axios';
  import { RecupererToDoListUsecase } from '@/domaines/toDoList/recupererToDoList.usecase';
  import { ToDoListEvent, ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { ListeUniversPresenterImpl, UniversViewModel } from '@/domaines/univers/adapters/listeUnivers.presenter.impl';
  import { UniversRepositoryAxios } from '@/domaines/univers/adapters/univers.repository.axios';
  import { RecupererListeUniversUsecase } from '@/domaines/univers/recupererListeUnivers.usecase';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { publierEvenementHotjar, HotjarEvenement } from '@/shell/publierEvenementHotjar';
  import { onboardingStore } from '@/store/onboarding';
  import { utilisateurStore } from '@/store/utilisateur';

  const { recommandationTour, defiTour } = useReveal();

  const isLoading = ref<boolean>(true);
  const todoList = ref<TodoListViewModel>();
  const universViewModel = ref<UniversViewModel[]>();
  const store = utilisateurStore();
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();
  let handleConcealEvent: () => void;

  const defisViewModel = ref<DefiDescriptionViewModel[]>();

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
    const chargerListeDefisUsecase = new RecupererDefisEnCoursOuAFaireUsecase(new DefiRepositoryAxios());
    const chargerUniversUsecase = new RecupererListeUniversUsecase(new UniversRepositoryAxios());

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
        idUtilisateur,
        new ListeUniversPresenterImpl(viewModel => (universViewModel.value = viewModel.univers)),
      ),
      chargerListeDefisUsecase.execute(
        idUtilisateur,
        new ListeDefisDescriptionPresenterImpl(viewModel => (defisViewModel.value = viewModel)),
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
    onboardingStore().reset();
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
  });

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE);
  });
</script>
