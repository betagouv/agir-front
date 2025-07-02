import { ResultatWattWatcherPresenter } from '@/domaines/simulationWattWatchers/ports/resultatWattWatcher.presenter';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/wattWatchers.repository';

export interface DetailUsage {
  type: string;
  eur: number;
  percent: number;
  couleur: string;
  emoji: string;
}

export interface ResultatWattWatchers {
  consommationTotaleEnEuros: number;
  economiesPossiblesEnEuros: number;
  economiesRealiseesEnEuros: number;
  nombreActionsAssociees: number;
  detailsUsages: DetailUsage[];
}

export class RecupererConsommationUsecase {
  constructor(private readonly wattWatchersRepository: WattWatchersRepository) {}

  async recupererConsommation(utilisateurId: string, presenter: ResultatWattWatcherPresenter): Promise<void> {
    const consommation = await this.wattWatchersRepository.recupererConsommation(utilisateurId);
    presenter.presenteResultatWattWatcher(consommation);
  }
}
