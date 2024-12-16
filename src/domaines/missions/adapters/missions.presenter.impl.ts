import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle } from '@/domaines/thematiques/TagThematique';
import { RouteExamenName } from '@/router/examen/routes';
import { RouteThematiquesName } from '@/router/thematiques/routes';

export interface MissionViewModel {
  titre: string;
  id: string;
  progression: {
    etapeActuelle: number;
    etapeCible: number;
  };
  estNouvelle: boolean;
  urlImage: string;
  estTerminee: boolean;
  clefThematique: string;
  tagThematique?: {
    label: string;
    style: TagStyle;
  };
  url: {
    name: string;
    id: string;
  };
}

export class MissionsPresenterImpl implements MissionsPresenter {
  constructor(private missionViewModel: (viewModel: MissionViewModel[]) => void) {}
  presente(missions: Mission[]): void {
    this.missionViewModel(
      missions.map(mission => ({
        titre: mission.titre,
        id: mission.id,
        progression: mission.progression,
        estNouvelle: mission.estNouvelle,
        urlImage: mission.urlImage,
        estTerminee: mission.progression.etapeActuelle === mission.progression.etapeCible,
        clefThematique: mission.thematiqueParent.clefAPI,
        tagThematique: undefined,
        url: {
          id: MenuThematiques.getThematiqueData(mission.thematiqueParent.clefAPI as ClefThematiqueAPI).url,
          name: mission.estUnExamen ? RouteExamenName.EXAMEN : RouteThematiquesName.MISSION,
        },
      })),
    );
  }
}
