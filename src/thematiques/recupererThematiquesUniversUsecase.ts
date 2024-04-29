import { ThematiqueRepository } from '@/thematiques/ports/thematique.repository';
import { ThematiquesPresenter } from '@/thematiques/ports/thematiques.presenter';

export interface Thematique {
  titre: string;
  id: string;
  progression: 0;
  estBloquee: boolean;
  raisonDuBlocage: string;
  estNouvelle: true;
  niveau: 0;
}

export class RecupererThematiquesUniversUsecase {
  constructor(private readonly thematiqueRepository: ThematiqueRepository) {}

  async execute(universId: string, utilisateurId: string, presenter: ThematiquesPresenter): Promise<void> {
    const thematiques = await this.thematiqueRepository.recupererThematiques(universId, utilisateurId);
    presenter.present(thematiques);
  }
}
