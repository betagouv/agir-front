import { AccueilConnectePresenter } from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
import { AccueilConnecteRepository } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';

export class RecupererAccueilConnecteUsecase {
  constructor(private readonly repository: AccueilConnecteRepository) {}

  async execute(utilisateurId: string, presenter: AccueilConnectePresenter): Promise<void> {
    const accueilConnecte = await this.repository.recupererAccueilConnecte(utilisateurId);
    presenter.presente(accueilConnecte);
  }
}
