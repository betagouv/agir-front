import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { TagStyle } from '@/domaines/thematiques/TagThematique';

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
}
export class MissionsPresenterImpl implements MissionsPresenter {
  constructor(private missionViewModel: (viewModel: MissionViewModel[]) => void) {}
  presente(missions: Mission[]): void {
    this.missionViewModel(
      missions.map(thematique => ({
        titre: thematique.titre,
        id: thematique.id,
        progression: thematique.progression,
        estNouvelle: thematique.estNouvelle,
        urlImage: thematique.urlImage,
        estTerminee: thematique.progression.etapeActuelle === thematique.progression.etapeCible,
        clefThematique: thematique.thematiqueParent.clefAPI,
        tagThematique: undefined,
      })),
    );
  }
}
