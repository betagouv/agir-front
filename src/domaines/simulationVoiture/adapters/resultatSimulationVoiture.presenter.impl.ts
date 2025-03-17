import {
  ResultatSimulationVoiture,
  VoitureActuelle,
  VoitureAlternative,
} from '@/domaines/simulationVoiture/entities/ResultatSimulationVoiture';
import { ResultatSimulationVoiturePresenter } from '@/domaines/simulationVoiture/ports/resultatSimulationVoiture.presenter';

export type ResultatSimulationVoitureViewModel = {
  resultatVoitureActuelle: ResultatSimulationVoitureActuelleViewModel;
  resultatVoiturePlusEconomique: ResultatSimulationVoitureProposeeViewModel;
  resultatVoiturePlusEcologique: ResultatSimulationVoitureProposeeViewModel;
};
export type ResultatSimulationVoitureActuelleViewModel = {
  gabarit: string;
  coupAnnuel: string;
  emissionAnnuelle: string;
  tag: string[];
};
export type ResultatSimulationVoitureProposeeViewModel = {
  typeDeVoiture: string;
  coutAnnuel: {
    montant: number;
    difference: number;
  };
  emission: {
    montant: number;
    difference: number;
  };
  tag: string[];
};

export class ResultatSimulationVoiturePresenterImpl implements ResultatSimulationVoiturePresenter {
  constructor(private readonly callback: (viewModel: ResultatSimulationVoitureViewModel) => void) {}

  private transformeVoitureProposee(
    voiture: VoitureAlternative,
    voitureActuelle: VoitureActuelle,
  ): ResultatSimulationVoitureProposeeViewModel {
    return {
      typeDeVoiture: voiture.getLabel(),
      coutAnnuel: {
        montant: Math.round(voiture.getCout()),
        difference: Math.round(voiture.getCout() - voitureActuelle.getCout()),
      },
      emission: {
        montant: Math.round(voiture.getEmpreinte()),
        difference: Math.round(
          ((voiture.getEmpreinte() - voitureActuelle.getEmpreinte()) / voitureActuelle.getEmpreinte()) * 100,
        ),
      },
      tag: [voiture.getCarburant(), voiture.getMotorisation()].filter(v => v.length > 0),
    };
  }

  presente(resultat: ResultatSimulationVoiture): void {
    const voitureActuelle = resultat.getVoitureActuelle();
    const voiturePlusEconomique = resultat.getVoitureLaPLusEconomique();
    const voiturePlusEcologique = resultat.getVoitureLaPLusEcologique();

    this.callback({
      resultatVoitureActuelle: {
        gabarit: voitureActuelle.getGabarit(),
        coupAnnuel: Math.round(voitureActuelle.getCout()).toString(),
        emissionAnnuelle: Math.round(voitureActuelle.getEmpreinte()).toString(),
        tag: [voitureActuelle.getCarburant(), voitureActuelle.getMotorisation()].filter(v => v.length > 0),
      },
      resultatVoiturePlusEconomique: this.transformeVoitureProposee(voiturePlusEconomique, voitureActuelle),
      resultatVoiturePlusEcologique: this.transformeVoitureProposee(voiturePlusEcologique, voitureActuelle),
    });
  }
}
