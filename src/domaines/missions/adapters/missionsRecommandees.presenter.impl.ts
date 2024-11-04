import { MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { TagThematique } from '@/shell/TagThematique';

export class MissionsRecommandeesPresenterImpl implements MissionsPresenter {
  constructor(private missionsViewModel: (viewModel: MissionViewModel[]) => void) {}

  presente(missions: Mission[]): void {
    this.missionsViewModel(
      missions.map(mission => ({
        titre: mission.titre,
        id: mission.id,
        progression: mission.progression,
        blocage: mission.estBloquee ? { raison: mission.raisonDuBlocage } : undefined,
        estNouvelle: mission.estNouvelle,
        niveau: mission.niveau,
        urlImage: mission.urlImage,
        estTerminee: mission.progression.etapeActuelle === mission.progression.etapeCible,
        clefThematique: mission.thematiqueParent.clefAPI,
        tagThematique: {
          label: mission.thematiqueParent.label,
          style: TagThematique.getTagThematiqueUtilitaire(mission.thematiqueParent.clefAPI),
        },
      })),
    );
  }
}
