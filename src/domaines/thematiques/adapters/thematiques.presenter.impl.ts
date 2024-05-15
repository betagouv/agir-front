import { ThematiquesPresenter } from '@/domaines/thematiques/ports/thematiques.presenter';
import { Thematique } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';

export interface ThematiqueViewModel {
  titre: string;
  id: string;
  progression: number;
  blocage?: {
    raison: string;
  };
  estNouvelle: boolean;
  niveau: number;
  urlImage: string;
}
export class ThematiquesPresenterImpl implements ThematiquesPresenter {
  constructor(private thematiquesViewModel: (viewModel: ThematiqueViewModel[]) => void) {}
  present(thematiques: Thematique[]): void {
    this.thematiquesViewModel(
      thematiques.map(thematique => ({
        titre: thematique.titre,
        id: thematique.id,
        progression: thematique.progression,
        blocage: thematique.estBloquee ? { raison: thematique.raisonDuBlocage } : undefined,
        estNouvelle: thematique.estNouvelle,
        niveau: thematique.niveau,
        urlImage: thematique.urlImage,
      })),
    );
  }
}
