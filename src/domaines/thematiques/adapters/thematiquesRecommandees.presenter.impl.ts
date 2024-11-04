import { MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { TagThematique } from '@/shell/TagThematique';

export class ThematiquesRecommandeesPresenterImpl implements MissionsPresenter {
  constructor(private thematiquesViewModel: (viewModel: MissionViewModel[]) => void) {}

  presente(thematiques: Mission[]): void {
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
