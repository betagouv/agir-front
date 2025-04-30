import { SimulateurMaifPresenter } from '@/domaines/simulationMaif/ports/simulateurMaif.presenter';
import { ResultatSimulationMaif, RisqueMaifImpact } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';

export type SimulateurMaifViewModel = {
  risques: {
    nom: string;
    badge?: {
      label: string;
      class: string;
    };
  }[];
  lienKit?: string;
};

export class SimulateurMaifPresenterImpl implements SimulateurMaifPresenter {
  constructor(private readonly callback: (simulateur: SimulateurMaifViewModel) => void) {}

  presente(resultatSimulateur: ResultatSimulationMaif): void {
    this.callback({
      risques: resultatSimulateur.risques
        ?.sort((a, b) => b.impact - a.impact)
        .map(risque => ({
          nom: risque.nom,
          badge: this.genererBadgeDepuisImpact(risque.impact),
        })),
    });
  }

  genererBadgeDepuisImpact(impact: RisqueMaifImpact) {
    switch (impact) {
      case RisqueMaifImpact.TRES_FAIBLE:
        return {
          label: 'Très faible',
          class: 'fr-badge--new',
        };
      case RisqueMaifImpact.FAIBLE:
        return {
          label: 'Faible',
          class: 'fr-badge--green-tilleul-verveine',
        };
      case RisqueMaifImpact.MOYEN:
        return {
          label: 'Moyen',
          class: 'fr-badge--brown-cafe-creme',
        };
      case RisqueMaifImpact.FORT:
        return {
          label: 'Fort',
          class: 'fr-badge--warning',
        };
      case RisqueMaifImpact.TRES_FORT:
        return {
          label: 'Très fort',
          class: 'fr-badge--error',
        };
    }
  }
}
