<template>
  <div class="fr-container fr-pb-4w">
    <FilDAriane
      page-courante="Thématique: à la maison"
      :page-hierarchie="[{ label: 'Univers', url: `univers/${useRoute().params.id}` }]"
    />
    <div class="fr-grid-row align-items--center fr-mb-4w">
      <img
        :src="mission?.urlImage"
        class="border-radius--full img-object-fit-cover fr-mr-2w"
        width="80"
        height="80"
        alt="univers"
      />
      <h1 class="fr-h1 fr-col fr-m-0">{{ mission?.titre }}</h1>
    </div>

    <div class="mission__dashline fr-pb-6w" v-if="mission">
      <ThematiquesMissions :missions="mission.kyc" />
      <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-1w fr-mt-3w fr-ml-6w">Articles et quiz</h2>
      <ThematiquesMissions :missions="mission.articleEtQuiz" />
      <h2 class="text--uppercase fr-text--xs text--bleu fr-mb-1w fr-mt-3w fr-ml-6w">Actions</h2>
      <ThematiquesMissions :missions="mission.defis" />
    </div>
    <h2 class="text--uppercase fr-text--xs text--bleu fr-pt-1w fr-pl-5v">
      <span class="fr-icon-gift-fill" aria-hidden="true"></span>
      Bonus de fin de mission
      <img src="/ic_score.svg" alt="" width="16" class="fr-ml-1v" />
    </h2>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ThematiquesMissions from '@/components/custom/Thematiques/ThematiquesMissions.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    MissionThematiquePresenterImpl,
    MissionThematiqueViewModel,
  } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
  import { ThematiqueRepositoryAxios } from '@/domaines/thematiques/adapters/thematique.repository.axios';
  import { RecupererMissionThematiqueUsecase } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const mission = ref<MissionThematiqueViewModel>();

  const usecase = new RecupererMissionThematiqueUsecase(new ThematiqueRepositoryAxios());

  function onMissionPretAAffchee(viewModel: MissionThematiqueViewModel) {
    mission.value = viewModel;
  }

  const thematiqueId = useRoute().params.id as string;
  const utilisateurId = utilisateurStore().utilisateur.id;

  usecase.execute(thematiqueId, utilisateurId, new MissionThematiquePresenterImpl(onMissionPretAAffchee));
</script>

<style scoped>
  .mission__dashline {
    position: relative;
  }

  .mission__dashline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 2rem;
    display: block;
    width: 0;
    border: 1px dashed var(--text-default-grey);
  }
</style>
