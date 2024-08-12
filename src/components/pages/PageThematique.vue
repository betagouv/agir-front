<template>
  <div v-if="isLoading">Chargement en cours ...</div>
  <div v-else-if="!missionViewModel">Une erreur est survenue</div>
  <div v-else class="fr-container fr-pb-4w">
    <ThematiquePageComposant :univers-id="universId" :mission-view-model="missionViewModel" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ThematiquePageComposant from '@/components/custom/Thematiques/ThematiquePageComposant.vue';
  import {
    MissionThematiquePresenterImpl,
    MissionThematiqueViewModel,
  } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
  import { ThematiqueRepositoryAxios } from '@/domaines/thematiques/adapters/thematique.repository.axios';
  import { RecupererMissionThematiqueUsecase } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
  import { ThematiqueEvent, ThematiqueEventBusImpl } from '@/domaines/thematiques/thematiqueEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const missionViewModel = ref<MissionThematiqueViewModel>();

  function onMissionPretAAffchee(viewModel: MissionThematiqueViewModel) {
    missionViewModel.value = viewModel;
  }

  const thematiqueId = useRoute().params.thematique as string;
  const universId = useRoute().params.id as string;

  const utilisateurId = utilisateurStore().utilisateur.id;
  const subscriberName = 'PageThematique';

  onMounted(async () => {
    const usecase = new RecupererMissionThematiqueUsecase(new ThematiqueRepositoryAxios());
    await usecase.execute(thematiqueId, utilisateurId, new MissionThematiquePresenterImpl(onMissionPretAAffchee));

    ThematiqueEventBusImpl.getInstance().subscribe(
      subscriberName,
      ThematiqueEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
      () => {
        usecase.execute(thematiqueId, utilisateurId, new MissionThematiquePresenterImpl(onMissionPretAAffchee));
      },
    );
    isLoading.value = false;
  });

  onUnmounted(() => {
    ThematiqueEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
  });
</script>
