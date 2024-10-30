<template>
  <FilDAriane
    :page-courante="`Thématique: ${missionViewModel.titre}`"
    :page-hierarchie="[{ label: 'Univers', url: `/univers/${MenuUnivers.getUniversData(universId).url}` }]"
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
  <div class="mission__dashline fr-col-md-8 fr-col-12">
    <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-3w fr-ml-6w">1. Adapter votre expérience</h2>
    <ThematiqueMissionKyc :missions="missionViewModel.kyc" />
    <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">
      2. Lire des articles et répondre aux quiz
    </h2>
    <ThematiqueMissionQuizArticle :missions="missionViewModel.articleEtQuiz" />
    <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">
      3. Réaliser au moins une action proposée
    </h2>
    <ThematiqueMissionDefis :defis="missionViewModel.defis" />
  </div>
  <div :class="`fr-col-md-8 fr-col-12 ${!missionViewModel.estTerminable ? 'opacity-6' : ''}`">
    <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-2w fr-mt-5w fr-ml-6w">4. Gagner votre carte</h2>
    <ThematiqueTerminee
      :url-image="missionViewModel.urlImage"
      :titre="missionViewModel.titre"
      :est-terminee="missionViewModel.estTerminee"
      :est-terminable="missionViewModel.estTerminable"
      :univers-id="universId"
      :thematique-id="thematiqueId"
    />
  </div>
</template>

<script setup lang="ts">
  import ThematiqueMissionDefis from '@/components/custom/Thematiques/ThematiqueMissionDefis.vue';
  import ThematiqueMissionKyc from '@/components/custom/Thematiques/ThematiqueMissionKyc.vue';
  import ThematiqueMissionQuizArticle from '@/components/custom/Thematiques/ThematiqueMissionQuizArticle.vue';
  import ThematiqueTerminee from '@/components/custom/Thematiques/ThematiqueTerminee.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { MissionThematiqueViewModel } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
  import { MenuUnivers } from '@/shell/MenuUnivers';

  defineProps<{ thematiqueId: string; universId: string; missionViewModel: MissionThematiqueViewModel }>();
</script>

<style scoped>
  .mission__dashline {
    position: relative;
  }

  .mission__dashline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: -3.3rem;
    left: 2rem;
    display: block;
    width: 0;
    border: 1px dashed var(--text-default-grey);
  }
</style>
