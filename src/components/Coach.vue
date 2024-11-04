<template>
  <div class="background--white fr-py-6w">
    <div class="fr-container">
      <h1 class="fr-h1 fr-m-0">Bonjour {{ utilisateurStore().utilisateur.prenom }} 👋</h1>
    </div>
    <div v-if="todoList && !todoList.derniere" class="fr-container fr-pt-3w">
      <div id="container-survey"></div>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col fr-col-lg-7">
          <CoachToDo :todoList="todoList" />
        </div>
        <div class="fr-col-12 fr-col-lg-5 fr-hidden fr-unhidden-lg">
          <img :src="todoList.imageUrl" class="fr-mx-auto max-full-width" alt="" />
        </div>
      </div>
    </div>
  </div>

  <section class="fr-pb-4w background--white">
    <div class="fr-container" v-if="!isLoading">
      <h2 class="fr-h3 fr-mb-1w">Recommandés <span class="text--bleu">pour vous</span></h2>
      <p class="fr-text--md">
        Des solutions <span class="text--bold">adaptées à votre situation</span> et les clés pour comprendre
      </p>
      <MissionsListe v-if="missionsRecommandeesViewModel" :missions="missionsRecommandeesViewModel" />
    </div>
    <div class="fr-container" v-else>
      <CarteSkeleton />
    </div>
  </section>

  <section v-if="todoList && todoList.derniere" class="fr-container fr-py-6w">
    <CoachBilanCarbone
      :bilanCarboneCompletViewModel="bilanCarboneCompletViewModel"
      :bilanCarbonePartielViewModel="bilanCarbonePartielViewModel"
    />
  </section>

  <section
    v-if="utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes(Fonctionnalites.AIDES)"
    class="fr-py-8w background--white position--relative"
  >
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

  <section id="recommandations" class="fr-pb-6w background--white">
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
      <router-link :to="{ name: RouteCoachName.BIBLIOTHEQUE }" class="fr-link">Voir ma bibliothèque</router-link>
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
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import CoachAides from '@/components/custom/Coach/CoachAides.vue';
  import CoachBilanCarbone from '@/components/custom/Coach/CoachBilanCarbone.vue';
  import CoachContact from '@/components/custom/Coach/CoachContact.vue';
  import CoachRecommandations from '@/components/custom/Coach/CoachRecommandations.vue';
  import CoachServices from '@/components/custom/Coach/CoachServices.vue';
  import CoachToDo from '@/components/custom/Coach/CoachToDo.vue';
  import MissionsListe from '@/components/custom/Mission/MissionsListe.vue';
  import { BilanCarboneRepositoryAxios } from '@/domaines/bilanCarbone/adapters/bilanCarbone.repository.axios';
  import {
    BilanCarboneAccueilPresenterImpl,
    BilanCarboneCompletAccueilViewModel,
    BilanCarbonePartielAccueilViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarboneAccueil.presenter.impl';
  import { RecupererBilanCarboneUsecase } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
  import { MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { MissionsRecommandeesPresenterImpl } from '@/domaines/missions/adapters/missionsRecommandees.presenter.impl';
  import { RecupererMissionsRecommandeesUsecase } from '@/domaines/missions/recupererMissionsRecommandees.usecase';
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
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { HotjarEvenement, publierEvenementHotjar } from '@/shell/publierEvenementHotjar';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const todoList = ref<TodoListViewModel>();

  const bilanCarboneCompletViewModel = ref<BilanCarboneCompletAccueilViewModel>();
  const bilanCarbonePartielViewModel = ref<BilanCarbonePartielAccueilViewModel>();
  const store = utilisateurStore();
  const missionsRecommandeesViewModel = ref<MissionViewModel[]>();
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();

  function mapValueTodo(viewModel: TodoListViewModel) {
    todoList.value = viewModel;
    if (todoList.value?.derniere) {
      publierEvenementHotjar(HotjarEvenement.DEBRIEF);
    }
  }

  const subscriberName = 'Coach';
  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const recupererMissionsRecommandeesUsecase = new RecupererMissionsRecommandeesUsecase(
      new MissionsRepositoryAxios(),
    );
    const chargerTodoListUsecase = new RecupererToDoListUsecase(new ToDoListRepositoryAxios());
    const chargerRecommandationsPersonnaliseesUsecase = new RecupererRecommandationsPersonnaliseesUsecase(
      new RecommandationsPersonnaliseesRepositoryAxios(),
    );

    const recupererBilanCarboneUsecase = new RecupererBilanCarboneUsecase(new BilanCarboneRepositoryAxios());

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
    });

    ToDoListEventBusImpl.getInstance().subscribe(
      subscriberName,
      ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE,
      () => {
        chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
      },
    );

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE, () => {
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo));
    });

    Promise.all([
      recupererMissionsRecommandeesUsecase.execute(
        idUtilisateur,
        new MissionsRecommandeesPresenterImpl(vm => (missionsRecommandeesViewModel.value = vm)),
      ),
      chargerTodoListUsecase.execute(idUtilisateur, new ToDoListPresenterImpl(mapValueTodo)),
      chargerRecommandationsPersonnaliseesUsecase.execute(
        idUtilisateur,
        new RecommandationsPersonnaliseesPresenterImpl(vm => (recommandationsPersonnaliseesViewModel.value = vm)),
      ),
      recupererBilanCarboneUsecase.execute(
        idUtilisateur,
        new BilanCarboneAccueilPresenterImpl(
          vm => (bilanCarboneCompletViewModel.value = vm),
          vm => (bilanCarbonePartielViewModel.value = vm),
        ),
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
