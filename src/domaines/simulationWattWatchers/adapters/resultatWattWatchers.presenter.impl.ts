import { ResultatWattWatcherPresenter } from '@/domaines/simulationWattWatchers/ports/resultatWattWatcher.presenter';
import {
  ResultatWattWatchers,
  TypeConsommation,
} from '@/domaines/simulationWattWatchers/recupererConsommation.usecase';
import { MontantAfficheEnFR, MontantAfficheEnFRBuilder } from '@/shell/nombreAfficheEnFRBuilder';

export type ResultatWWViewModel = {
  totalConsommation: MontantAfficheEnFR;
  economieActuelle: { valeur: number; enEuro: MontantAfficheEnFR };
  economiePotentielle: { valeur: number; enEuro: MontantAfficheEnFR };
  nombreActions: number;

  detailConsommations: {
    color: string;
    emoji: string;
    label: string;
    value: number;
    pourcentage: string;
  }[];
};

export class ResultatWWPresenterImpl implements ResultatWattWatcherPresenter {
  constructor(private readonly callback: (resultat: ResultatWWViewModel) => void) {}

  presenteResultatWattWatcher(resultat: ResultatWattWatchers) {
    this.callback({
      totalConsommation: MontantAfficheEnFRBuilder.build(resultat.consommationTotaleEnEuros),
      economieActuelle: {
        valeur: resultat.economiesRealiseesEnEuros,
        enEuro: MontantAfficheEnFRBuilder.build(resultat.economiesRealiseesEnEuros),
      },
      economiePotentielle: {
        valeur: resultat.economiesPossiblesEnEuros,
        enEuro: MontantAfficheEnFRBuilder.build(resultat.economiesPossiblesEnEuros),
      },
      nombreActions: resultat.nombreActionsAssociees,

      detailConsommations: resultat.detailsUsages.map(detail => ({
        color: `#${detail.couleur}`,
        emoji: detail.emoji,
        label: this.genererLabel(detail.type),
        value: detail.eur,
        pourcentage: `${detail.percent}%`,
      })),
    });
  }

  genererLabel(type: TypeConsommation): string {
    const mappingTypeVersLabel: Record<TypeConsommation, string> = {
      [TypeConsommation.Chauffage]: 'Chauffage',
      [TypeConsommation.EauChaude]: 'Eau chaude',
      [TypeConsommation.Cuisson]: 'Cuisson',
      [TypeConsommation.Electromenager]: 'Électroménager',
      [TypeConsommation.Multimedia]: 'Multimédia',
      [TypeConsommation.Climatisation]: 'Climatisation',
      [TypeConsommation.Eclairage]: 'Éclairage',
      [TypeConsommation.Mobilite]: 'Mobilité',
      [TypeConsommation.Piscine]: 'Piscine',
      [TypeConsommation.Autres]: 'Autres',
    };

    return mappingTypeVersLabel[type] || 'Autres';
  }
}
