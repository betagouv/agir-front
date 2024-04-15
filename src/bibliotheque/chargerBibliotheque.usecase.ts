import { BibliothequePresenter } from '@/bibliotheque/ports/bibliotheque.presenter';
import { BibliothequeRepository } from '@/bibliotheque/ports/bibliotheque.repository';

export class ChargerBibliothequeUsecase {
  constructor(private readonly bibliothequeRepository: BibliothequeRepository) {}

  async execute(utilisateurId: string, presenter: BibliothequePresenter): Promise<void> {
    const bibliotheque = await this.bibliothequeRepository.chargerBibliotheque(utilisateurId);
    presenter.presente(bibliotheque);
  }
}
