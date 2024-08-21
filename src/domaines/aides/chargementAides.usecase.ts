import { ChargementAidesPresenter } from '@/domaines/aides/ports/chargementAides.presenter';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';

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

  async execute(utilisateurId: string, presenter: ChargementAidesPresenter) {
    const reponse = await this.chargementAidesRepositoryRepository.getAides(utilisateurId);
    presenter.presente(reponse);
  }
}
