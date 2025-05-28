import { SimulateurMaifPresenter } from '@/domaines/simulationMaif/ports/simulateurMaif.presenter';
import { ResultatSimulationMaif, RisqueMaifImpact } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';

export type SimulateurMaifViewModel = {
  risques: {
    nom: string;
    badge: {
      label: string;
      class: string;
    };
    illustration: string;
  }[];
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
          illustration: this.recupererLienIllustration(risque.id),
        })),
    });
  }

  genererBadgeDepuisImpact(impact: RisqueMaifImpact) {
    switch (impact) {
      case RisqueMaifImpact.TRES_FAIBLE:
        return {
          label: 'Très faible',
          class: 'badge--tres-faible',
        };
      case RisqueMaifImpact.FAIBLE:
        return {
          label: 'Faible',
          class: 'badge--faible',
        };
      case RisqueMaifImpact.MOYEN:
        return {
          label: 'Moyen',
          class: 'badge--moyen',
        };
      case RisqueMaifImpact.FORT:
        return {
          label: 'Fort',
          class: 'badge--fort',
        };
      case RisqueMaifImpact.TRES_FORT:
        return {
          label: 'Très fort',
          class: 'badge--tres-fort',
        };
      case RisqueMaifImpact.INCONNU:
        return {
          label: 'Non disponible',
          class: '',
        };
    }
  }

  recupererLienIllustration(id: string): string {
    switch (id) {
      case 'secheresse':
        return '/maif/argiles.svg';
      case 'inondation':
        return '/maif/inondations.svg';
      case 'submersion':
        return '/maif/submersions.svg';
      case 'tempete':
        return '/maif/tempetes.svg';
      case 'argile':
        return '/maif/argiles.svg';
      case 'seisme':
        return '/maif/seismes.svg';
      case 'radon':
        return '/maif/radon.svg';
      default:
        return '';
    }
  }
}
