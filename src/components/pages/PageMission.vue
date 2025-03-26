<template>
  <div class="fr-container fr-pb-4w">
    <p v-if="isLoading" class="fr-mt-4w">Chargement en cours ...</p>
    <p v-else-if="!missionViewModel" class="fr-mt-4w">Une erreur est survenue</p>
    <template v-else>
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
        :on-click-continuer="() => miseAJourEtatCourant('KYC', 0)"
        :tag="missionViewModel.tag"
        :texte="missionViewModel.intro"
        :titre="missionViewModel.titre"
        :url-image="missionViewModel.urlImage"
      />
      <MissionsQuestionsKyc
        v-if="etapeCourante.type === 'KYC'"
        :etape-courante-defaut="etapeCourante.etapeDansLetape"
        :kycs="missionViewModel.kyc.kycs"
        :nombre-etapes-mission="missionViewModel.nombreEtapesMission"
        :on-click-revenir-etape-precedente="() => miseAJourEtatCourant('INTRO', 0)"
        :on-kyc-termine="() => miseAJourEtatCourant('QUIZ_ARTICLE', 0)"
      />
      <MissionQuizArticles
        v-if="etapeCourante.type === 'QUIZ_ARTICLE'"
        :etape-courante-defaut="etapeCourante.etapeDansLetape"
        :missions="missionViewModel.articleEtQuiz"
        :nombre-detapes-precendentes="missionViewModel.kyc.progression.etapeTotal"
        :nombre-etapes-mission="missionViewModel.nombreEtapesMission"
        :on-click-fin-quiz-article="() => miseAJourEtatCourant('DEFI', 0)"
        :on-click-revenir-etape-precedente="
          () => miseAJourEtatCourant('KYC', missionViewModel!.kyc.progression.etapeTotal - 1)
        "
      />
      <MissionTerminee v-if="etapeCourante.type === 'FIN'" :titre="missionViewModel.titre" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import MissionIntroduction from '@/components/custom/Mission/MissionIntroduction.vue';
  import MissionQuizArticles from '@/components/custom/Mission/MissionQuizArticles.vue';
  import MissionsQuestionsKyc from '@/components/custom/Mission/MissionsQuestionsKyc.vue';
  import MissionTerminee from '@/components/custom/Mission/MissionTerminee.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { MissionPresenterImpl, MissionViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { determineEtapeMission, EtatsPossible } from '@/domaines/missions/determineEtapeMission';
  import { MissionEvent, MissionEventBusImpl } from '@/domaines/missions/missionEventBus.impl';
  import { RecupererDetailMissionUsecase } from '@/domaines/missions/recupererDetailMission.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  interface EtapeCourante {
    etapeDansLetape: number;
    type: EtatsPossible;
  }

  const subscriberName = 'PageMission';

  const etapeCourante = ref<EtapeCourante>({ etapeDansLetape: 0, type: 'INTRO' });

  const isLoading = ref<boolean>(true);
  const missionViewModel = ref<MissionViewModel>();

  const missionId = useRoute().params.missionId as string;

  const utilisateurId = utilisateurStore().utilisateur.id;

  function onMissionPretAAfficher(viewModel: MissionViewModel) {
    missionViewModel.value = viewModel;
  }

  onMounted(async () => {
    try {
      const usecase = new RecupererDetailMissionUsecase(new MissionsRepositoryAxios());
      await usecase.execute(missionId, utilisateurId, new MissionPresenterImpl(onMissionPretAAfficher));

      MissionEventBusImpl.getInstance().subscribe(
        subscriberName,
        MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
        () => {
          usecase.execute(missionId, utilisateurId, new MissionPresenterImpl(onMissionPretAAfficher));
        },
      );
    } finally {
      isLoading.value = false;
      const etat = determineEtapeMission(missionViewModel.value!);
      miseAJourEtatCourant(etat.etat, etat.indexEtape);
    }
  });

  const miseAJourEtatCourant = (etat: EtatsPossible, indexEtape: number): void => {
    etapeCourante.value = { etapeDansLetape: indexEtape, type: etat };
  };

  onUnmounted(() => {
    MissionEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
  });
</script>
