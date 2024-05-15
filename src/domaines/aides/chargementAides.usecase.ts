import { ChargementAidesPresenter } from '@/domaines/aides/ports/chargementAides.presenter';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';
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
    private publierEvenementRepository: PublierEvenementRepository,
  ) {}

  async execute(utilisateurId: string, presenter: ChargementAidesPresenter) {
    const reponse = await this.chargementAidesRepositoryRepository.getAides(utilisateurId);
    await this.publierEvenementRepository.publierEvenement(utilisateurId, Evenemement.AIDES_CONSULTEES);
    presenter.presente(reponse);
  }
}
