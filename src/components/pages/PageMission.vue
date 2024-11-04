<template>
  <div v-if="isLoading">Chargement en cours ...</div>
  <div v-else-if="!missionViewModel">Une erreur est survenue</div>
  <div v-else class="fr-container fr-pb-4w">
    <MissionPageComposant
      :thematique-id="thematiqueId"
      :univers-id="clefUniversAPI"
      :mission-view-model="missionViewModel"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import MissionPageComposant from '@/components/custom/Mission/MissionPageComposant.vue';
  import { MissionPresenterImpl, MissionViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { MissionEvent, MissionEventBusImpl } from '@/domaines/missions/missionEventBus.impl';
  import { RecupererDetailMissionUsecase } from '@/domaines/missions/recupererDetailMission.usecase';
  import { ClefTechniqueAPI, MenuUnivers } from '@/shell/MenuUnivers';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const missionViewModel = ref<MissionViewModel>();

  function onMissionPretAAffchee(viewModel: MissionViewModel) {
    missionViewModel.value = viewModel;
  }

  const thematiqueId = useRoute().params.thematique as string;
  const clefUniversAPI = MenuUnivers.getFromUrl(useRoute().params.id as ClefTechniqueAPI)!.clefTechniqueAPI;

  const utilisateurId = utilisateurStore().utilisateur.id;
  const subscriberName = 'PageThematique';

  onMounted(async () => {
    const usecase = new RecupererDetailMissionUsecase(new MissionsRepositoryAxios());
    await usecase.execute(thematiqueId, utilisateurId, new MissionPresenterImpl(onMissionPretAAffchee));

    MissionEventBusImpl.getInstance().subscribe(
      subscriberName,
      MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
      () => {
        usecase.execute(thematiqueId, utilisateurId, new MissionPresenterImpl(onMissionPretAAffchee));
      },
    );
    isLoading.value = false;
  });

  onUnmounted(() => {
    MissionEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
  });
</script>
