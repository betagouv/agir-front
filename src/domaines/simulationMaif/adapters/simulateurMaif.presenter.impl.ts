import { SimulateurMaifPresenter } from '@/domaines/simulationMaif/ports/simulateurMaif.presenter';
import { ResultatSimulationMaif, RisqueMaifImpact } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { Coordonnees } from '@/shell/coordonneesType';

export type SimulateurMaifViewModel = {
  risques: {
    nom: string;
    badge: {
      label: string;
      class: string;
    };
    illustration: string;
  }[];
  lienKit: string;
};

export class SimulateurMaifPresenterImpl implements SimulateurMaifPresenter {
  constructor(private readonly callback: (simulateur: SimulateurMaifViewModel) => void) {}

  presente(resultatSimulateur: ResultatSimulationMaif, coordonnees: Coordonnees): void {
    this.callback({
      risques: resultatSimulateur.risques
        ?.sort((a, b) => b.impact - a.impact)
        .map(risque => ({
          nom: risque.nom,
          badge: this.genererBadgeDepuisImpact(risque.impact),
          illustration: this.recupererLienIllustration(risque.id),
        })),
      lienKit: `https://api.aux-alentours.1934.io/report/pdf/v2/_byLatLon?lat=${coordonnees.latitude}&lon=${coordonnees.longitude}`,
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
