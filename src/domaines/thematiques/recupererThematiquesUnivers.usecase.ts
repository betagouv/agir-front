import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { ThematiquesPresenter } from '@/domaines/thematiques/ports/thematiques.presenter';

export interface Thematique {
  titre: string;
  id: string;
  progression: {
    etapeActuelle: number;
    etapeCible: number;
  };
  estBloquee: boolean;
  raisonDuBlocage: string;
  estNouvelle: boolean;
  niveau: number;
  urlImage: string;
  thematiqueParent: {
    apiId: string;
    label: string;
  };
}

export class RecupererThematiquesUniversUsecase {
  constructor(private readonly thematiqueRepository: ThematiqueRepository) {}

  async execute(universId: string, utilisateurId: string, presenter: ThematiquesPresenter): Promise<void> {
    const thematiques = await this.thematiqueRepository.recupererThematiques(universId, utilisateurId);
    presenter.present(thematiques);
  }
}
