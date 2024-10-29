import { ThematiqueViewModel } from '@/domaines/thematiques/adapters/thematiques.presenter.impl';
import { ThematiquesPresenter } from '@/domaines/thematiques/ports/thematiques.presenter';
import { Thematique } from '@/domaines/thematiques/thematique';
import { TagThematique } from '@/shell/TagThematique';

export class ThematiquesRecommandeesPresenterImpl implements ThematiquesPresenter {
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
        estTerminee: thematique.progression.etapeActuelle === thematique.progression.etapeCible,
        clefThematique: thematique.thematiqueParent.clefAPI,
        tagThematique: {
          label: thematique.thematiqueParent.label,
          style: TagThematique.getTagThematiqueUtilitaire(thematique.thematiqueParent.clefAPI),
        },
      })),
    );
  }
}
