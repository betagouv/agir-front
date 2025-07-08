import { ResultatWattWatcherPresenter } from '@/domaines/simulationWattWatchers/ports/resultatWattWatcher.presenter';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/wattWatchers.repository';

export interface DetailUsage {
  type: TypeConsommation;
  eur: number;
  percent: number;
  couleur: string;
  emoji: string;
}

export enum TypeConsommation {
  Chauffage = 'heating',
  EauChaude = 'hotWater',
  Cuisson = 'cooking',
  Electromenager = 'appliances',
  Multimedia = 'multimedia',
  Climatisation = 'airConditioning',
  Eclairage = 'lighting',
  Mobilite = 'mobility',
  Piscine = 'swimmingPool',
  Autres = 'other',
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
