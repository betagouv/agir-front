<template>
  <div v-if="isLoading">Chargement en cours ...</div>
  <div v-else-if="!missionViewModel">Une erreur est survenue</div>
  <div v-else class="fr-container fr-pb-4w">
    <FilDAriane
      :page-courante="`Mission : ${missionViewModel.titre}`"
      :page-hierarchie="
        useRoute().params.id && useRoute().params.missionId
          ? [
              {
                label: `${MenuThematiques.getFromUrl(useRoute().params.id as string).labelDansLeMenu}`,
                url: `/thematique/${useRoute().params.id}`,
              },
            ]
          : []
      "
    />
    <MissionIntroduction
      v-if="etapeCourante.type === 'INTRO'"
      :titre="missionViewModel.titre"
      :url-image="missionViewModel.urlImage"
      :texte="missionViewModel.intro"
      :tag="missionViewModel.tag"
      :on-click-continuer="() => miseAJourEtatCourant('KYC', 0)"
    />
    <PageMissionQuestionsKyc
      v-if="etapeCourante.type === 'KYC'"
      :mission-id="missionId"
      :on-click-fin-k-y-c="() => miseAJourEtatCourant('QUIZ_ARTICLE', 0)"
      :on-click-revenir-etape-precedente="() => miseAJourEtatCourant('INTRO', 0)"
      :etape-courante-defaut="etapeCourante.etapeDansLetape"
      :nombre-etapes-mission="missionViewModel.nombreEtapesMission"
    />
    <MissionQuizArticles
      v-if="etapeCourante.type === 'QUIZ_ARTICLE'"
      :missions="missionViewModel.articleEtQuiz"
      :on-click-fin-quiz-article="() => miseAJourEtatCourant('DEFI', 0)"
      :on-click-revenir-etape-precedente="
        () => miseAJourEtatCourant('KYC', missionViewModel!.kyc[0].progression.etapeTotal - 1)
      "
      :etape-courante-defaut="etapeCourante.etapeDansLetape"
      :nombre-etapes-mission="missionViewModel.nombreEtapesMission"
      :nombre-detapes-precendentes="missionViewModel?.kyc[0].progression.etapeTotal"
    />
    <MissionDefis
      v-if="etapeCourante.type === 'DEFI'"
      :defis="missionViewModel.defis"
      :on-click-retour="() => miseAJourEtatCourant('QUIZ_ARTICLE', missionViewModel!.articleEtQuiz.length - 1)"
      :on-click-fin-defis="() => miseAJourEtatCourant('FIN', 0)"
      :nombre-etapes-mission="missionViewModel.nombreEtapesMission"
      :afficher-terminer-mission="missionViewModel.estTerminable && !missionViewModel.estTerminee"
    />
    <MissionTerminee v-if="etapeCourante.type === 'FIN'" :titre="missionViewModel.titre" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import MissionDefis from '@/components/custom/Mission/MissionDefis.vue';
  import MissionIntroduction from '@/components/custom/Mission/MissionIntroduction.vue';
  import MissionQuizArticles from '@/components/custom/Mission/MissionQuizArticles.vue';
  import MissionTerminee from '@/components/custom/Mission/MissionTerminee.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import PageMissionQuestionsKyc from '@/components/pages/PageMissionQuestionsKyc.vue';
  import { MissionPresenterImpl, MissionViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { RecupererDetailMissionUsecase } from '@/domaines/missions/recupererDetailMission.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  interface EtapeCourante {
    etapeDansLetape: number;
    type: EtatsPossible;
  }

  type EtatsPossible = 'INTRO' | 'KYC' | 'QUIZ_ARTICLE' | 'DEFI' | 'FIN';

  const etapeCourante = ref<EtapeCourante>({ etapeDansLetape: 0, type: 'INTRO' });

  const isLoading = ref<boolean>(true);
  const missionViewModel = ref<MissionViewModel>();

  function onMissionPretAAffchee(viewModel: MissionViewModel) {
    missionViewModel.value = viewModel;
  }

  const missionId = useRoute().params.missionId as string;

  const utilisateurId = utilisateurStore().utilisateur.id;

  onMounted(async () => {
    const usecase = new RecupererDetailMissionUsecase(new MissionsRepositoryAxios());
    await usecase.execute(missionId, utilisateurId, new MissionPresenterImpl(onMissionPretAAffchee));

    isLoading.value = false;

    const quizArticleAAfficher = missionViewModel.value?.articleEtQuiz.find(elem => elem.aEteRealisee);
    if (missionViewModel.value?.estTerminee) {
      miseAJourEtatCourant('INTRO', 0);
    } else if (missionViewModel.value?.kyc[0].progression.etapeCourante === 0) {
      miseAJourEtatCourant('INTRO', 0);
    } else if (
      missionViewModel.value?.kyc[0].progression.etapeCourante !== missionViewModel.value?.kyc[0].progression.etapeTotal
    ) {
      miseAJourEtatCourant('KYC', missionViewModel.value!.kyc[0].progression.etapeCourante);
    } else if (!quizArticleAAfficher) {
      miseAJourEtatCourant('QUIZ_ARTICLE', 0);
    } else {
      miseAJourEtatCourant('DEFI', 0);
    }
  });

  const miseAJourEtatCourant = (etat: EtatsPossible, indexEtape: number): void => {
    etapeCourante.value = { etapeDansLetape: indexEtape, type: etat };
  };
</script>
