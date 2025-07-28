import { EtatPrm } from '@/domaines/simulationWattWatchers/recupererEtatPrm.usecase';

export enum EtapeSimulateur {
  INTRODUCTION = 'introduction',
  RENSEIGNEMENT = 'question',
  SIMULATEUR = 'simulateur',
  RESULTAT = 'resultat',
}

type EtapeSimulateurEtMessage = {
  etape: EtapeSimulateur;
  message?: string;
};

export function recupererEtapeSimulateurEtMessage(etatPrm: EtatPrm, aDejaEteSimule: boolean): EtapeSimulateurEtMessage {
  if (!etatPrm.estPrmPresent) {
    return { etape: EtapeSimulateur.INTRODUCTION };
  }

  if (etatPrm.estPrmObsolete) {
    return {
      etape: EtapeSimulateur.RENSEIGNEMENT,
      message:
        "Suite à la modification de l'adresse de votre résidence principale, nous vous invitons à reprendre votre parcours et à vérifier vos réponses aux questions.",
    };
  }

  if (aDejaEteSimule) {
    return { etape: EtapeSimulateur.RESULTAT };
  }

  return { etape: EtapeSimulateur.SIMULATEUR };
}
