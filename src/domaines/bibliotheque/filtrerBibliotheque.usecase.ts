import { BibliothequePresenter } from '@/domaines/bibliotheque/ports/bibliotheque.presenter';
import { BibliothequeRepository } from '@/domaines/bibliotheque/ports/bibliotheque.repository';

export class FiltrerBibliothequeUsecase {
  constructor(private readonly bibliothequeRepository: BibliothequeRepository) {}

  async execute(
    utilisateurId: string,
    filtresThematiques: string[],
    titre: string,
    filtreFavoris: boolean,
    filtreArticleLus: boolean,
    presenter: BibliothequePresenter,
  ): Promise<void> {
    const bibliotheque = await this.bibliothequeRepository.filtrerBibliotheque(
      utilisateurId,
      filtresThematiques,
      titre,
      filtreFavoris,
      filtreArticleLus,
    );
    presenter.presente(bibliotheque);
  }
}
