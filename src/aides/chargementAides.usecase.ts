import { ChargementAidesRepository } from '@/aides/ports/chargementAides.repository';
import { ChargementAidesPresenter } from '@/aides/ports/chargementAides.presenter';

export interface Aides {
  id: string;
  titre: string;
  categorie: string;
  contenu: string;
  url: string;
  isSimulateur: boolean;
  montantMaximum?: number;
}

export default class ChargementAidesUsecase {
  constructor(private chargementAidesRepositoryRepository: ChargementAidesRepository) {}

  async execute(presenter: ChargementAidesPresenter) {
    const reponse = await this.chargementAidesRepositoryRepository.getAides();
    presenter.presente(reponse);
  }
}
