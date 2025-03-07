import { ChargementAidesPresenter } from '@/domaines/aides/ports/chargementAides.presenter';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export default class RecupererAidesDUneThematiqueUsecase {
  constructor(private chargementAidesRepositoryRepository: ChargementAidesRepository) {}

  async execute(utilisateurId: string, clefThematique: ClefThematiqueAPI, presenter: ChargementAidesPresenter) {
    const reponse = await this.chargementAidesRepositoryRepository.recupererAidesDuneThematique(
      utilisateurId,
      clefThematique,
    );
    presenter.presente(reponse);
  }
}
