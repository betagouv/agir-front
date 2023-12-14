import { ChargementAidesRepository } from '@/aides/ports/chargementAides.repository';
import { ChargementAidesPresenter } from '@/aides/ports/chargementAides.presenter';
import { Evenemement, PublierEvenementRepository } from '@/shell/ports/publierEvenement.repository';

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
  constructor(
    private chargementAidesRepositoryRepository: ChargementAidesRepository,
    private publierEvenementRepository: PublierEvenementRepository
  ) {}

  async execute(utilisateurId: string, presenter: ChargementAidesPresenter) {
    const reponse = await this.chargementAidesRepositoryRepository.getAides();
    await this.publierEvenementRepository.publierEvenement(utilisateurId, Evenemement.AIDES_CONSULTEES);
    presenter.presente(reponse);
  }
}
