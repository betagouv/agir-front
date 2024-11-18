<template>
  <div v-if="isLoading">Chargement en cours ...</div>
  <div v-else-if="!missionViewModel">Une erreur est survenue</div>
  <div v-else class="fr-container fr-pb-4w">
    <MissionIntroduction
      v-if="etapeCourante.type === 'INTRO'"
      :titre="missionViewModel.titre"
      :url-image="missionViewModel.urlImage"
      texte="lorem"
      :tag="missionViewModel.tag"
      :on-click-continuer="() => miseAJourEtatCourant('KYC', 0)"
    />
    <PageMissionQuestionsKyc
      v-if="etapeCourante.type === 'KYC'"
      :mission-id="missionId"
      :on-click-fin-k-y-c="() => miseAJourEtatCourant('QUIZ_ARTICLE', 0)"
      :on-click-revenir-etape-precedente="() => miseAJourEtatCourant('INTRO', 0)"
      :etape-courante-defaut="etapeCourante.etapeDansLetape"
    />
    <MissionQuizArticles
      v-if="etapeCourante.type === 'QUIZ_ARTICLE'"
      :missions="missionViewModel.articleEtQuiz"
      :on-click-fin-quiz-article="() => miseAJourEtatCourant('DEFI', 0)"
      :on-click-revenir-etape-precedente="() => miseAJourEtatCourant('KYC', missionViewModel!.kyc.length)"
      :etape-courante-defaut="etapeCourante.etapeDansLetape"
    />
    <MissionDefis
      v-if="etapeCourante.type === 'DEFI'"
      :defis="missionViewModel.defis"
      :on-click-retour="() => miseAJourEtatCourant('QUIZ_ARTICLE', missionViewModel!.articleEtQuiz.length - 1)"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import MissionDefis from '@/components/custom/Mission/MissionDefis.vue';
  import MissionIntroduction from '@/components/custom/Mission/MissionIntroduction.vue';
  import MissionQuizArticles from '@/components/custom/Mission/MissionQuizArticles.vue';
  import PageMissionQuestionsKyc from '@/components/pages/PageMissionQuestionsKyc.vue';
  import { MissionPresenterImpl, MissionViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { MissionEvent, MissionEventBusImpl } from '@/domaines/missions/missionEventBus.impl';
  import { RecupererDetailMissionUsecase } from '@/domaines/missions/recupererDetailMission.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  interface EtapeCourante {
    etapeDansLetape: number;
    type: EtatsPossible;
  }

  type EtatsPossible = 'INTRO' | 'KYC' | 'QUIZ_ARTICLE' | 'DEFI';

  const etapeCourante = ref<EtapeCourante>({ etapeDansLetape: 0, type: 'INTRO' });

  const isLoading = ref<boolean>(true);
  const missionViewModel = ref<MissionViewModel>();

  function onMissionPretAAffchee(viewModel: MissionViewModel) {
    missionViewModel.value = viewModel;
  }

  const missionId = useRoute().params.missionId as string;

  const utilisateurId = utilisateurStore().utilisateur.id;
  const subscriberName = 'PageMission';

  onMounted(async () => {
    const usecase = new RecupererDetailMissionUsecase(new MissionsRepositoryAxios());
    await usecase.execute(missionId, utilisateurId, new MissionPresenterImpl(onMissionPretAAffchee));

    MissionEventBusImpl.getInstance().subscribe(
      subscriberName,
      MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
      () => {
        usecase.execute(missionId, utilisateurId, new MissionPresenterImpl(onMissionPretAAffchee));
      },
    );
    isLoading.value = false;

    const quizArticleAAfficher = missionViewModel.value?.articleEtQuiz.find(elem => elem.aEteRealisee);
    if (!missionViewModel.value?.kyc[0].aEteRealisee) {
      miseAJourEtatCourant('KYC', 0);
    } else if (!quizArticleAAfficher) {
      miseAJourEtatCourant('QUIZ_ARTICLE', 0);
    } else {
      miseAJourEtatCourant('DEFI', 0);
    }
  });

  const miseAJourEtatCourant = (etat: EtatsPossible, indexEtape: number): void => {
    etapeCourante.value = { etapeDansLetape: indexEtape, type: etat };
  };

  onUnmounted(() => {
    MissionEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
  });
</script>
