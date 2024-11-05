import { ThematiquePresenter } from '@/domaines/thematiques/ports/thematique.presenter';
import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiquesRepository';

export class RecupererThematiqueUsecase {
  constructor(private readonly thematiquesRepository: ThematiquesRepository) {}

  async execute(utilisateurId: string, thematiqueId: string, thematiquePresenter: ThematiquePresenter): Promise<void> {
    const thematique = await this.thematiquesRepository.recupererThematique(utilisateurId, thematiqueId);
    thematiquePresenter.presente(thematique);
  }
}

export interface Thematique {
  id: string;
  nom: string;
  urlImage: string;
}
