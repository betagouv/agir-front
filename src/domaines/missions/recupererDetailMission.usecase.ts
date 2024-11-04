import { MissionPresenter } from '@/domaines/missions/ports/missionPresenter';
import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';

export interface MissionItem {
  id: string;
  contentId: string;
  titre: string;
  progression: number;
  estBloquee: boolean;
  estRecommande: boolean;
  estEnCours: boolean;
  points: number;
  aEteRealisee: boolean;
  type: string;
  pointAEteRecolte: boolean;
}

export interface DetailMission {
  urlImage: string;
  titre: string;
  univers: string;
  estTerminee: boolean;
  estTerminable: boolean;
  items: MissionItem[];
  missionId: string;
  progressionKyc: {
    etapeCourante: number;
    etapeTotal: number;
  };
}

export class RecupererDetailMissionUsecase {
  constructor(private missionsRepository: MissionsRepository) {}

  async execute(missionId: string, utilisateurId: string, presenter: MissionPresenter): Promise<void> {
    const missionThematique = await this.missionsRepository.recupererDetailMission(missionId, utilisateurId);
    presenter.presente({
      ...missionThematique,
      missionId,
    });
  }
}
