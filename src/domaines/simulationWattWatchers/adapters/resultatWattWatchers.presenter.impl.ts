import { ResultatWattWatcherPresenter } from '@/domaines/simulationWattWatchers/ports/resultatWattWatcher.presenter';
import { ResultatWattWatchers } from '@/domaines/simulationWattWatchers/recupererConsommation.usecase';

export type ResultatWWViewModel = {
  totalConsommation: number;
  economieActuelle: number;
  economiePotentielle: number;
  nombreActions: number;

  detailConsommations: {
    color: string;
    emoji: string;
    id: string;
    label: string;
    value: number;
    pourcentage: string;
  }[];
};

export class ResultatWWPresenterImpl implements ResultatWattWatcherPresenter {
  constructor(private readonly callback: (resultat: ResultatWWViewModel) => void) {}

  presenteResultatWattWatcher(resultat: ResultatWattWatchers) {
    this.callback({
      totalConsommation: resultat.consommationTotaleEnEuros,
      economieActuelle: resultat.economiesRealiseesEnEuros,
      economiePotentielle: resultat.economiesPossiblesEnEuros,
      nombreActions: resultat.nombreActionsAssociees,

      detailConsommations: resultat.detailsUsages.map(detail => ({
        color: detail.couleur,
        emoji: detail.emoji,
        id: detail.type,
        label: detail.type,
        value: detail.eur,
        pourcentage: `${detail.percent}%`,
      })),
    });
  }
}
