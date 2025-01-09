import { MissionPresenter } from '@/domaines/missions/ports/missionPresenter';
import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

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
  clefApiThematique: ClefThematiqueAPI;
  estTerminee: boolean;
  estTerminable: boolean;
  intro: string;
  items: MissionItem[];
  missionId: string;
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
