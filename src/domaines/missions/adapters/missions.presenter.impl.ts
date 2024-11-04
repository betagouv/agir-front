import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { TagStyle } from '@/shell/TagThematique';

export interface MissionViewModel {
  titre: string;
  id: string;
  progression: {
    etapeActuelle: number;
    etapeCible: number;
  };
  blocage?: {
    raison: string;
  };
  estNouvelle: boolean;
  niveau?: number;
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
        blocage: thematique.estBloquee ? { raison: thematique.raisonDuBlocage } : undefined,
        estNouvelle: thematique.estNouvelle,
        niveau: thematique.niveau,
        urlImage: thematique.urlImage,
        estTerminee: thematique.progression.etapeActuelle === thematique.progression.etapeCible,
        clefThematique: thematique.thematiqueParent.clefAPI,
        tagThematique: undefined,
      })),
    );
  }
}
