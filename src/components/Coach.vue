<template>
  <div class="fr-pt-4w fr-pb-1w background--white">
    <div class="fr-container">
      <h1 class="fr-h1 fr-m-0">Bonjour {{ utilisateurStore().utilisateur.prenom }} 👋</h1>
    </div>
  </div>

  <section class="background--white">
    <div class="fr-container fr-py-4w">
      <CoachBilanCarbone
        :bilanCarboneAFaireViewModel="bilanCarboneAFaireViewModel"
        :bilanCarboneCompletViewModel="bilanCarboneCompletViewModel"
      />
    </div>
  </section>

  <section class="fr-pb-4w fr-pt-2w">
    <div v-if="!isLoading" class="fr-container">
      <h2 class="fr-h3 fr-mb-1w">Recommandés <span class="text--bleu">pour vous</span></h2>
      <p class="fr-text--md">
        Des solutions <span class="text--bold">adaptées à votre situation</span> et les clés pour comprendre
      </p>
      <MissionsListe v-if="missionsRecommandeesViewModel" :missions="missionsRecommandeesViewModel" />
    </div>
    <div v-else class="fr-container">
      <CarteSkeleton class="fr-mb-3w" />
    </div>
  </section>

  <section class="fr-py-8w background--white position--relative">
    <div class="section--outils">
      <img alt="" src="/ic_outils.svg" />
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
    <div v-if="!isLoading" class="fr-container">
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
        :recommandations="recommandationsPersonnaliseesViewModel.autresRecommandations"
        class="fr-mb-3w"
      />
      <router-link :to="{ name: RouteCoachName.BIBLIOTHEQUE }" class="fr-link">Voir ma bibliothèque</router-link>
    </div>
    <div v-else class="fr-container">
      <CarteSkeleton />
    </div>
  </section>

  <section class="fr-py-6w background--image--coach">
    <div class="fr-container">
      <CoachContact />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import CoachAides from '@/components/custom/Coach/CoachAides.vue';
  import CoachBilanCarbone from '@/components/custom/Coach/CoachBilanCarbone.vue';
  import CoachContact from '@/components/custom/Coach/CoachContact.vue';
  import CoachRecommandations from '@/components/custom/Coach/CoachRecommandations.vue';
  import CoachServices from '@/components/custom/Coach/CoachServices.vue';
  import MissionsListe from '@/components/custom/Mission/MissionsListe.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import { BilanCarboneAFaireViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
  import { BilanCarboneRepositoryAxios } from '@/domaines/bilanCarbone/adapters/bilanCarbone.repository.axios';
  import {
    BilanCarboneAccueilPresenterImpl,
    BilanCarboneCompletAccueilViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarboneAccueil.presenter.impl';
  import { RecupererBilanCarboneAccueilUsecase } from '@/domaines/bilanCarbone/recupererBilanCarboneAccueil.usecase';
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
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);

  const bilanCarboneCompletViewModel = ref<BilanCarboneCompletAccueilViewModel>();
  const bilanCarboneAFaireViewModel = ref<BilanCarboneAFaireViewModel>();
  const store = utilisateurStore();
  const missionsRecommandeesViewModel = ref<MissionViewModel[]>();
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();

  const subscriberName = 'Coach';
  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const recupererMissionsRecommandeesUsecase = new RecupererMissionsRecommandeesUsecase(
      new MissionsRepositoryAxios(),
    );
    const chargerRecommandationsPersonnaliseesUsecase = new RecupererRecommandationsPersonnaliseesUsecase(
      new RecommandationsPersonnaliseesRepositoryAxios(),
    );

    const recupererBilanCarboneUsecase = new RecupererBilanCarboneAccueilUsecase(new BilanCarboneRepositoryAxios());

    Promise.all([
      recupererMissionsRecommandeesUsecase.execute(
        idUtilisateur,
        new MissionsRecommandeesPresenterImpl(vm => (missionsRecommandeesViewModel.value = vm)),
      ),
      chargerRecommandationsPersonnaliseesUsecase.execute(
        idUtilisateur,
        new RecommandationsPersonnaliseesPresenterImpl(vm => (recommandationsPersonnaliseesViewModel.value = vm)),
      ),
      recupererBilanCarboneUsecase.execute(
        idUtilisateur,
        new BilanCarboneAccueilPresenterImpl(
          vm => (bilanCarboneCompletViewModel.value = vm),
          vm => (bilanCarboneAFaireViewModel.value = vm),
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
