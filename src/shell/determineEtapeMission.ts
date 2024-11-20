import { MissionViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

export type EtatsPossible = 'INTRO' | 'KYC' | 'QUIZ_ARTICLE' | 'DEFI' | 'FIN';

export function determineEtapeMission(missionViewModel: MissionViewModel): { etat: EtatsPossible; indexEtape: number } {
  const { etapeCourante: etapeKycCourante, etapeTotal: etapeKycTotal } = missionViewModel.kyc[0].progression;

  const missionEstTerminee = missionViewModel.estTerminee;
  const aucuneKycRepondu = etapeKycCourante === 0;
  if (missionEstTerminee || aucuneKycRepondu) {
    return { etat: 'INTRO', indexEtape: 0 };
  }

  if (etapeKycCourante !== etapeKycTotal) {
    return { etat: 'KYC', indexEtape: etapeKycCourante };
  }

  const indexDuDernierQuizzRealise = missionViewModel.articleEtQuiz.findLastIndex(elem => elem.aEteRealisee);
  const aucunQuizzRepondu = indexDuDernierQuizzRealise !== undefined && indexDuDernierQuizzRealise === -1;
  if (aucunQuizzRepondu) {
    return { etat: 'QUIZ_ARTICLE', indexEtape: 0 };
  }

  const quizzEstCommence = indexDuDernierQuizzRealise > -1;
  const quizzNestPasTermine = indexDuDernierQuizzRealise < missionViewModel.articleEtQuiz.length - 1;
  if (quizzEstCommence && quizzNestPasTermine) {
    return { etat: 'QUIZ_ARTICLE', indexEtape: indexDuDernierQuizzRealise + 1 };
  }

  // ToDo: mettre par défaut l'intro et conditionner ça
  return { etat: 'DEFI', indexEtape: 0 };
}
