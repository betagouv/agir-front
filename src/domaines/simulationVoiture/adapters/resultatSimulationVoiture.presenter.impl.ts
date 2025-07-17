import {
  ResultatSimulationVoiture,
  VoitureAlternative,
} from '@/domaines/simulationVoiture/entities/ResultatSimulationVoiture';
import { ResultatSimulationVoiturePresenter } from '@/domaines/simulationVoiture/ports/resultatSimulationVoiture.presenter';
import {
  MontantAfficheEnFR,
  MontantAfficheEnFRBuilder,
  NombreAfficheEnFR,
  NombreAfficheEnFRBuilder,
} from '@/shell/nombreAfficheEnFRBuilder';

export type ResultatSimulationVoitureViewModel = {
  resultatVoitureActuelle: ResultatSimulationVoitureActuelleViewModel;
  resultatVoiturePlusEconomique: ResultatSimulationVoitureProposeeViewModel;
  resultatVoiturePlusEcologique: ResultatSimulationVoitureProposeeViewModel;
};

export type Hypotheses = {
  label: string;
  valeur: string;
  unite?: string;
};

export type ResultatSimulationVoitureActuelleViewModel = {
  gabarit: string;
  coutAnnuel: MontantAfficheEnFR;
  emissionAnnuelle: NombreAfficheEnFR;
  hypotheses: Hypotheses[];
  tag: string[];
};

export type ResultatSimulationVoitureProposeeViewModel = {
  typeDeVoiture: string;
  coutAnnuel: {
    montant: MontantAfficheEnFR;
    difference: number;
    style: string;
    labelDifference: string;
  };
  emission: {
    montant: NombreAfficheEnFR;
    difference: number;
    style: string;
    labelDifference: string;
  };
  tag: string[];
};

export class ResultatSimulationVoiturePresenterImpl implements ResultatSimulationVoiturePresenter {
  constructor(private readonly callback: (viewModel: ResultatSimulationVoitureViewModel) => void) {}

  presente(resultat: ResultatSimulationVoiture): void {
    const voitureActuelle = resultat.getVoitureActuelle();
    const voiturePlusEconomique = resultat.getVoitureLaPLusEconomique();
    const voiturePlusEcologique = resultat.getVoitureLaPLusEcologique();

    this.callback({
      resultatVoitureActuelle: {
        gabarit: voitureActuelle.getGabarit(),
        coutAnnuel: MontantAfficheEnFRBuilder.build(Math.round(voitureActuelle.getCout())),
        emissionAnnuelle: NombreAfficheEnFRBuilder.build(Math.round(voitureActuelle.getEmpreinte())),
        hypotheses: voitureActuelle.getParams().map(param => ({
          label: param.getNom(),
          valeur: param.getValeur(),
          unite: param.getUnite(),
        })),
        tag: [voitureActuelle.getCarburant(), voitureActuelle.getMotorisation()].filter(v => v.length > 0),
      },
      resultatVoiturePlusEconomique: this.transformeVoitureProposee(voiturePlusEconomique),
      resultatVoiturePlusEcologique: this.transformeVoitureProposee(voiturePlusEcologique),
    });
  }

  private transformeVoitureProposee(voiture: VoitureAlternative): ResultatSimulationVoitureProposeeViewModel {
    const countAnnuelDifference = voiture.getDifferenceCoutAnnuel();
    const pourcentageDifferenceEmission = voiture.getDifferenceEmission();
    return {
      typeDeVoiture: voiture.getLabel(),
      coutAnnuel: {
        montant: MontantAfficheEnFRBuilder.build(Math.round(voiture.getCout())),
        difference: countAnnuelDifference,
        labelDifference:
          countAnnuelDifference > 0
            ? `+${MontantAfficheEnFRBuilder.build(countAnnuelDifference)}`
            : MontantAfficheEnFRBuilder.build(countAnnuelDifference),
        style: countAnnuelDifference < 0 ? 'fr-badge--success' : 'fr-badge--warning',
      },
      emission: {
        montant: NombreAfficheEnFRBuilder.build(Math.round(voiture.getEmpreinte())),
        difference: pourcentageDifferenceEmission,
        labelDifference: `${pourcentageDifferenceEmission}%`,
        style: pourcentageDifferenceEmission < 0 ? 'fr-badge--success' : 'fr-badge--warning',
      },
      tag: [voiture.getCarburant(), voiture.getMotorisation()].filter(v => v.length > 0),
    };
  }
}
