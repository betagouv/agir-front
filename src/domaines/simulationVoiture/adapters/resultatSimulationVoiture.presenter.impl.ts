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
} from '@/shell/formatting/nombreAfficheEnFRBuilder';

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
};

export type ResultatSimulationVoitureProposeeViewModel = {
  typeDeVoiture: string;
  cout: {
    coutAchatNet: MontantAfficheEnFR;
    prixAchat: MontantAfficheEnFR;
  };
  economies: {
    difference: number;
    style: string;
    labelDifference: string;
  };
  emission: {
    difference: number;
    style: string;
    labelDifference: string;
  };
  dureeSeuilRentabilite: {
    valeur: number | null;
    unite: string;
  };
  economiesTotales: MontantAfficheEnFR | undefined;
  montantAide: MontantAfficheEnFR | undefined;
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
      },
      resultatVoiturePlusEconomique: this.transformeVoitureProposee(voiturePlusEconomique),
      resultatVoiturePlusEcologique: this.transformeVoitureProposee(voiturePlusEcologique),
    });
  }

  private transformeVoitureProposee(voiture: VoitureAlternative): ResultatSimulationVoitureProposeeViewModel {
    const countAnnuelDifference = voiture.getDifferenceCoutAnnuel();
    const pourcentageDifferenceEmission = voiture.getDifferenceEmission();
    let dureeSeuilRentabilite = voiture.getDureeSeuilRentabilite();
    dureeSeuilRentabilite = dureeSeuilRentabilite !== null ? Math.round(dureeSeuilRentabilite) : null;
    const economiesTotales = voiture.getEconomiesTotales();
    const montantAide = voiture.getMontantAides();
    const normalizeDifference = (value: number) => ({
      difference: value,
      labelDifference: `${value < 0 ? '+' : '-'}${Math.round(Math.abs(value))}`,
      style: value > 0 ? 'fr-badge--success' : 'fr-badge--warning',
    });

    return {
      typeDeVoiture: voiture.getLabel(),
      cout: {
        coutAchatNet: MontantAfficheEnFRBuilder.build(voiture.getCoutAchatNet()),
        prixAchat: MontantAfficheEnFRBuilder.build(voiture.getPrixAchat()),
      },
      economies: normalizeDifference(countAnnuelDifference),
      emission: normalizeDifference(pourcentageDifferenceEmission),
      dureeSeuilRentabilite: {
        valeur: dureeSeuilRentabilite,
        unite:
          dureeSeuilRentabilite === null
            ? ''
            : dureeSeuilRentabilite > 1
              ? 'ans'
              : dureeSeuilRentabilite <= 0
                ? ''
                : 'an',
      },
      economiesTotales: economiesTotales > 0 ? MontantAfficheEnFRBuilder.build(economiesTotales) : undefined,
      montantAide: montantAide > 0 ? MontantAfficheEnFRBuilder.build(montantAide) : undefined,
    };
  }
}
