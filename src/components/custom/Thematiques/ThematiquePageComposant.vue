<template>
  <FilDAriane
    :page-courante="`Thématique: ${missionViewModel.titre}`"
    :page-hierarchie="[{ label: 'Univers', url: `univers/${universId}` }]"
  />
  <div class="fr-grid-row align-items--center fr-mb-4w">
    <img
      :src="missionViewModel.urlImage"
      class="border-radius--md img-object-fit-cover fr-mr-2w"
      width="120"
      height="100"
      alt=""
    />
    <div>
      <span class="text--bleu">Mission</span>
      <h1 class="fr-h1 fr-col fr-m-0">{{ missionViewModel.titre }}</h1>
    </div>
  </div>
  <div class="mission__dashline">
    <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-3w fr-ml-6w">1. Adapter votre expérience</h2>
    <ThematiquesMissions :missions="missionViewModel.kyc" />
    <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">
      2. Lire des articles et répondre aux quiz
    </h2>
    <ThematiquesMissions :missions="missionViewModel.articleEtQuiz" />
    <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">
      3. Réaliser au moins une action proposée
    </h2>
    <ThematiquesMissions :missions="missionViewModel.defis" />
  </div>
  <div :class="`${!missionViewModel.estTerminee ? 'opacity-6' : ''}`">
    <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">4. Fin de la mission</h2>
    <ThematiqueTerminee
      :url-image="missionViewModel.urlImage"
      :titre="missionViewModel.titre"
      :est-terminee="missionViewModel.estTerminee"
      :univers-id="universId"
    />
  </div>
</template>

<script setup lang="ts">
  import ThematiquesMissions from '@/components/custom/Thematiques/ThematiquesMissions.vue';
  import ThematiqueTerminee from '@/components/custom/Thematiques/ThematiqueTerminee.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { MissionThematiqueViewModel } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';

  defineProps<{ universId: string; missionViewModel: MissionThematiqueViewModel }>();
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
</style>
