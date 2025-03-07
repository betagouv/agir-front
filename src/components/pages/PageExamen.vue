<template>
  <div class="fr-container fr-pb-4w">
    <p v-if="isLoading" class="fr-mt-4w">Chargement en cours ...</p>
    <p v-else-if="!examenViewModel" class="fr-mt-4w">Une erreur est survenue</p>
    <template v-else>
      <FilDAriane
        :page-courante="`Quiz : ${examenViewModel.titre}`"
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
        :on-click-continuer="() => miseAJourEtatCourant('QUIZ_ARTICLE', 0)"
        :tag="examenViewModel.tag"
        :texte="examenViewModel.intro"
        :titre="examenViewModel.titre"
        :url-image="examenViewModel.urlImage"
      />
      <ExamenQuiz
        v-if="etapeCourante.type === 'QUIZ_ARTICLE'"
        :etape-courante-defaut="etapeCourante.etapeDansLetape"
        :nombre-detapes-precendentes="1"
        :nombre-etapes-mission="examenViewModel.nombreEtapesMission"
        :on-click-fin-quiz-article="() => miseAJourEtatCourant('FIN', 0)"
        :on-click-revenir-etape-precedente="() => miseAJourEtatCourant('INTRO', 0)"
        :quizz="examenViewModel.quizz"
        :titre="examenViewModel.titre"
      />
      <ExamenTerminee v-if="etapeCourante.type === 'FIN'" :titre="examenViewModel.titre" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ExamenQuiz from '@/components/custom/Mission/Examen/ExamenQuiz.vue';
  import ExamenTerminee from '@/components/custom/Mission/Examen/ExamenTerminee.vue';
  import MissionIntroduction from '@/components/custom/Mission/MissionIntroduction.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ExamenPresenterImpl, ExamenViewModel } from '@/domaines/missions/adapters/examen.presenter.impl';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { EtatsPossible } from '@/domaines/missions/determineEtapeMission';
  import { MissionEvent, MissionEventBusImpl } from '@/domaines/missions/missionEventBus.impl';
  import { RecupererDetailMissionUsecase } from '@/domaines/missions/recupererDetailMission.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  interface EtapeCourante {
    etapeDansLetape: number;
    type: EtatsPossible;
  }

  const subscriberName = 'PageExamen';

  const etapeCourante = ref<EtapeCourante>({ etapeDansLetape: 0, type: 'INTRO' });

  const isLoading = ref<boolean>(true);
  const examenViewModel = ref<ExamenViewModel>();

  const missionId = useRoute().params.missionId as string;

  const utilisateurId = utilisateurStore().utilisateur.id;

  function onMissionPretAAfficher(viewModel: ExamenViewModel) {
    examenViewModel.value = viewModel;
  }

  onMounted(async () => {
    try {
      const usecase = new RecupererDetailMissionUsecase(new MissionsRepositoryAxios());
      await usecase.execute(missionId, utilisateurId, new ExamenPresenterImpl(onMissionPretAAfficher));

      MissionEventBusImpl.getInstance().subscribe(
        subscriberName,
        MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
        () => {
          usecase.execute(missionId, utilisateurId, new ExamenPresenterImpl(onMissionPretAAfficher));
        },
      );
    } finally {
      isLoading.value = false;
      const etat = determineEtapeExamen(examenViewModel.value!);
      miseAJourEtatCourant(etat.etat, etat.indexEtape);
    }
  });

  function determineEtapeExamen(examenViewModel: ExamenViewModel): { etat: EtatsPossible; indexEtape: number } {
    const missionEstTerminee = examenViewModel.estTerminee;
    const indexDuDernierQuizzRealise = examenViewModel.quizz.findLastIndex(elem => elem.aEteRealisee);
    const aucunQuizzRepondu = indexDuDernierQuizzRealise !== undefined && indexDuDernierQuizzRealise === -1;

    if (missionEstTerminee || aucunQuizzRepondu) {
      return { etat: 'INTRO', indexEtape: 0 };
    }

    const quizzEstCommence = indexDuDernierQuizzRealise > -1;
    const quizzNestPasTermine = indexDuDernierQuizzRealise < examenViewModel.quizz.length - 1;
    if (quizzEstCommence && quizzNestPasTermine) {
      return { etat: 'QUIZ_ARTICLE', indexEtape: indexDuDernierQuizzRealise };
    }

    return { etat: 'INTRO', indexEtape: 0 };
  }

  const miseAJourEtatCourant = (etat: EtatsPossible, indexEtape: number): void => {
    etapeCourante.value = { etapeDansLetape: indexEtape, type: etat };
  };

  onUnmounted(() => {
    MissionEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
  });
</script>
