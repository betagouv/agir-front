<template>
  <div class="background--white fr-py-8w">
    <div class="fr-container">
      <h1 class="fr-h1 fr-m-0">Bonjour {{ utilisateurStore().utilisateur.prenom }} 👋</h1>
      <p class="fr-text--xl fr-mb-0">
        Réduisez votre impact environnemental en <strong>complétant des missions</strong>
      </p>
    </div>

    <div v-if="todoList && !todoList.derniere" class="fr-container fr-pt-3w">
      <div id="container-survey"></div>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col fr-col-lg-7">
          <CoachToDo :todoList="todoList" />
        </div>
        <div class="fr-col-12 fr-col-lg-5">
          <img :src="todoList.imageUrl" class="max-full-width" alt="" />
        </div>
      </div>
    </div>

    <section
      v-if="universViewModel"
      v-tour-step:1="{
        tour: universTour,
        options: {
          attachTo: { on: 'bottom' },
          title: 'Univers débloqués',
          text: 'Retrouvez ici tous vos univers !',
        },
      }"
      id="univers"
      class="fr-py-3w"
    >
      <div class="fr-container">
        <CoachUnivers :universViewModel="universViewModel" />
      </div>
    </section>
  </div>

  <section class="fr-py-8w position--relative">
    <div class="section--outils">
      <img src="/ic_outils.svg" alt="" />
    </div>
    <div class="fr-container">
      <h2 class="fr-h2 text--center fr-mb-5w">Les outils pour vous aider</h2>
      <div class="fr-grid-row flex-space-between section--outils-separator">
        <CoachAides class="fr-col-lg-5 fr-col-12 fr-mb-4w" />
        <CoachServices class="fr-col-lg-5 fr-col-12" />
      </div>
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
      <h2 class="fr-h3 fr-mb-1w">Articles et quiz recommandés pour vous</h2>
      <p class="fr-text--md">
        Sélection suggérée en fonction de vos
        <router-link
          :to="{ name: RouteCompteName.MIEUX_VOUS_CONNAITRE }"
          class="fr-link fr-icon-user-setting-line fr-link--icon-right fr-text--md"
        >
          préférences
        </router-link>
      </p>
      <CoachRecommandations
        v-if="recommandationsPersonnaliseesViewModel"
        class="fr-mb-2w"
        :recommandations="recommandationsPersonnaliseesViewModel.autresRecommandations"
      />
      <router-link :to="{ name: RouteCoachName.BIBLIOTHEQUE }" class="fr-link"> Voir la bibliothèque </router-link>
    </div>
    <div class="fr-container" v-else>
      <CarteSkeleton />
    </div>
  </section>
  <section class="fr-py-6w background--image--coach">
    <div class="fr-container">
      <CoachContact />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import CoachRecommandations from './custom/Coach/CoachRecommandations.vue';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import CoachAides from '@/components/custom/Coach/CoachAides.vue';
  import CoachContact from '@/components/custom/Coach/CoachContact.vue';
  import CoachServices from '@/components/custom/Coach/CoachServices.vue';
  import CoachToDo from '@/components/custom/Coach/CoachToDo.vue';
  import CoachUnivers from '@/components/custom/Coach/CoachUnivers.vue';
  import { useReveal } from '@/composables/useReveal';
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
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { publierEvenementHotjar, HotjarEvenement } from '@/shell/publierEvenementHotjar';
  import { utilisateurStore } from '@/store/utilisateur';

  const { recommandationTour, universTour } = useReveal();

  const isLoading = ref<boolean>(true);
  const todoList = ref<TodoListViewModel>();
  const universViewModel = ref<UniversViewModel[]>();
  const store = utilisateurStore();
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();

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
    const chargerUniversUsecase = new RecupererListeUniversUsecase(new UniversRepositoryAxios());

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
    });

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
      chargerUniversUsecase.execute(
        idUtilisateur,
        new ListeUniversPresenterImpl(viewModel => (universViewModel.value = viewModel.univers)),
      );
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
  });

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
  });
</script>

<style scoped>
  .section--outils {
    position: absolute;
    top: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }

  @media (min-width: 62em) {
    .section--outils-separator::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 1px;
      height: 60%;
      background-color: #d8e0e0;
      transform: translateY(50%);
    }
  }
</style>
