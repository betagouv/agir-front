import { BibliothequeRepository } from '@/bibliotheque/ports/bibliotheque.repository';
import { BibliothequePresenter } from '@/bibliotheque/ports/bibliotheque.presenter';

export class FiltrerBibliothequeUsecase {
  constructor(private readonly bibliothequeRepository: BibliothequeRepository) {}

  async execute(
    utilisateurId: string,
    filtresThematiques: string[],
    titre: string,
    presenter: BibliothequePresenter
  ): Promise<void> {
    const bibliotheque = await this.bibliothequeRepository.filtrerBibliotheque(
      utilisateurId,
      filtresThematiques,
      titre
    );
    presenter.presente(bibliotheque);
  }
}
