<template>
  <div class="fr-container fr-pb-4w">
    <FilDAriane
      page-courante="Thématique: à la maison"
      :page-hierarchie="[{ label: 'Univers', url: `univers/${universId}` }]"
    />
    <div class="fr-grid-row align-items--center fr-mb-4w">
      <img
        :src="mission?.urlImage"
        class="border-radius--md img-object-fit-cover fr-mr-2w"
        width="120"
        height="100"
        alt="univers"
      />
      <div>
        <span class="text--bleu">Mission</span>
        <h1 class="fr-h1 fr-col fr-m-0">{{ mission?.titre }}</h1>
      </div>
    </div>
    <div class="mission__dashline" v-if="mission">
      <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-3w fr-ml-6w">1. Adapter votre expérience</h2>
      <ThematiquesMissions :missions="mission.kyc" />
      <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">
        2. Lire des articles et répondre aux quiz
      </h2>
      <ThematiquesMissions :missions="mission.articleEtQuiz" />
      <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">
        3. Réaliser au moins une action proposée
      </h2>
      <ThematiquesMissions :missions="mission.defis" />
    </div>
    <div v-if="mission" :class="`${!mission.estTerminee ? 'opacity-6' : ''}`">
      <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">4. Fin de la mission</h2>
      <div
        class="fr-grid-row position--relative align-items--center background--white z-index-2 shadow fr-p-2w border border-radius--md"
      >
        <img
          :src="mission?.urlImage"
          class="fr-col-auto border-radius--md img-object-fit-cover fr-mr-2w"
          width="120"
          height="100"
          alt="univers"
        />
        <div class="fr-col">
          <span class="text--bleu">Mission terminée</span>
          <h1 class="fr-h1 fr-col fr-m-0">{{ mission?.titre }}</h1>
        </div>
        <button
          class="fr-btn fr-btn--secondary fr-ml-auto fr-col-auto"
          :disabled="!mission.estTerminee"
          data-fr-opened="false"
          :aria-controls="modaleId"
        >
          Terminer la mission
        </button>
      </div>
    </div>
  </div>

  <Teleport to="body" v-if="mission && mission?.estTerminee">
    <Modale label="Modale de fin de mission" :id="modaleId" :radius="true" :is-footer-actions="false" size="s">
      <template v-slot:contenu>
        <div class="fr-grid-row fr-grid-row--gutters toto">
          <div class="fr-col-7">
            <h1 :id="modaleId" class="">Bravo !</h1>
            <p class="fr-text--lg text--bleu fr-mb-0">Vous avez gagné votre carte mission</p>
          </div>
          <ThematiqueCardDone class="fr-col-5" :titre="mission.titre" :urlImage="mission.urlImage" />
        </div>
        <div class="fr-py-3w text--center">
          <h2 class="fr-text--lg fr-mb-2w">Découvrez de nouvelles missions</h2>
          <router-link :to="`/univers/${universId}`" class="fr-btn fr-btn--lg"> Revenir à l’univers </router-link>
        </div>
      </template>
    </Modale>
  </Teleport>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ThematiqueCardDone from '@/components/custom/Thematiques/ThematiqueCardDone.vue';
  import ThematiquesMissions from '@/components/custom/Thematiques/ThematiquesMissions.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    MissionThematiquePresenterImpl,
    MissionThematiqueViewModel,
  } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
  import { ThematiqueRepositoryAxios } from '@/domaines/thematiques/adapters/thematique.repository.axios';
  import { RecupererMissionThematiqueUsecase } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
  import { ThematiqueEvent, ThematiqueEventBusImpl } from '@/domaines/thematiques/thematiqueEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const modaleId = 'terminer-mission-modale';
  const mission = ref<MissionThematiqueViewModel>();
  const usecase = new RecupererMissionThematiqueUsecase(new ThematiqueRepositoryAxios());

  function onMissionPretAAffchee(viewModel: MissionThematiqueViewModel) {
    mission.value = viewModel;
  }

  const thematiqueId = useRoute().params.thematique as string;
  const universId = useRoute().params.id as string;

  const utilisateurId = utilisateurStore().utilisateur.id;
  const subscriberName = 'PageThematique';

  usecase.execute(thematiqueId, utilisateurId, new MissionThematiquePresenterImpl(onMissionPretAAffchee));

  onMounted(() => {
    ThematiqueEventBusImpl.getInstance().subscribe(
      subscriberName,
      ThematiqueEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
      () => {
        usecase.execute(thematiqueId, utilisateurId, new MissionThematiquePresenterImpl(onMissionPretAAffchee));
      },
    );
  });

  onUnmounted(() => {
    ThematiqueEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
  });
</script>

<style scoped>
  .mission__dashline {
    position: relative;
  }

  .mission__dashline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: -4rem;
    left: 2rem;
    display: block;
    width: 0;
    border: 1px dashed var(--text-default-grey);
  }

  .toto {
    padding: 1rem;
    flex-direction: row-reverse;
    background-image: url('/bg_fin-de-mission.jpg');
    background-size: cover;
    background-position: center;
  }
</style>
