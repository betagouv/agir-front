import { BibliothequeRepository } from '@/bibliotheque/ports/bibliotheque.repository';
import { BibliothequePresenter } from '@/bibliotheque/ports/bibliotheque.presenter';

export class ChargerBibliothequeUsecase {
  constructor(private readonly bibliothequeRepository: BibliothequeRepository) {}

  async execute(
    utilisateurId: string,
    filtresThematiques: string[],
    titre: string,
    presenter: BibliothequePresenter
  ): Promise<void> {
    const bibliotheque = await this.bibliothequeRepository.chargerBibliotheque(
      utilisateurId,
      filtresThematiques,
      titre
    );
    presenter.presente(bibliotheque);
  }
}
