import { BibliothequeRepository } from '@/bibliotheque/ports/bibliotheque.repository';
import { BibliothequePresenter } from '@/bibliotheque/ports/bibliotheque.presenter';

export class ChargerBibliothequeUsecase {
  constructor(private readonly bibliothequeRepository: BibliothequeRepository) {}

  async execute(utilisateurId: string, filtres: string[], presenter: BibliothequePresenter): Promise<void> {
    const bibliotheque = await this.bibliothequeRepository.chargerBibliotheque(utilisateurId, filtres);
    presenter.presente(bibliotheque);
  }
}
