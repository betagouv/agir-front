import { MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagThematique } from '@/domaines/thematiques/TagThematique';
import { RouteExamenName } from '@/router/examen/routes';
import { RouteThematiquesName } from '@/router/thematiques/routes';

export class MissionsRecommandeesPresenterImpl implements MissionsPresenter {
  constructor(private missionsViewModel: (viewModel: MissionViewModel[]) => void) {}

  presente(missions: Mission[]): void {
    this.missionsViewModel(
      missions.map(mission => ({
        titre: mission.titre,
        id: mission.id,
        progression: mission.progression,
        estNouvelle: mission.estNouvelle,
        urlImage: mission.urlImage,
        estTerminee: mission.progression.etapeActuelle === mission.progression.etapeCible,
        clefThematique: mission.thematiqueParent.clefAPI,
        tagThematique: {
          label: mission.thematiqueParent.label,
          style: TagThematique.getTagThematiqueUtilitaire(mission.thematiqueParent.clefAPI),
        },
        url: {
          id: MenuThematiques.getThematiqueData(mission.thematiqueParent.clefAPI as ClefThematiqueAPI).url,
          name: mission.estUnExamen ? RouteExamenName.EXAMEN : RouteThematiquesName.MISSION,
        },
      })),
    );
  }
}
