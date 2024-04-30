import { ThematiqueRepository } from '@/thematiques/ports/thematique.repository';
import { ThematiquesPresenter } from '@/thematiques/ports/thematiques.presenter';

export interface Thematique {
  titre: string;
  id: string;
  progression: number;
  estBloquee: boolean;
  raisonDuBlocage: string;
  estNouvelle: boolean;
  niveau: number;
}

export class RecupererThematiquesUniversUsecase {
  constructor(private readonly thematiqueRepository: ThematiqueRepository) {}

  async execute(universId: string, utilisateurId: string, presenter: ThematiquesPresenter): Promise<void> {
    const thematiques = await this.thematiqueRepository.recupererThematiques(universId, utilisateurId);
    presenter.present(thematiques);
  }
}
