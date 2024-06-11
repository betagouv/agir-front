import { MissionThematiquePresenter } from '@/domaines/thematiques/ports/missionThematique.presenter';
import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';

export interface MissionItem {
  id: string;
  contentId: string;
  titre: string;
  progression: number;
  estBloquee: boolean;
  estRecommande: boolean;
  points: number;
  aEteRealisee: boolean;
  type: string;
  pointAEteRecolte: boolean;
}

export interface MissionThematique {
  urlImage: string;
  titre: string;
  univers: string;
  estTerminee: boolean;
  items: MissionItem[];
  idThematique: string;
  progressionKyc: {
    etapeCourante: number;
    etapeTotal: number;
  };
}

export class RecupererMissionThematiqueUsecase {
  constructor(private thematiqueRepository: ThematiqueRepository) {}

  async execute(thematiqueId: string, utilisateurId: string, presenter: MissionThematiquePresenter): Promise<void> {
    const missionThematique = await this.thematiqueRepository.recupererMissionThematique(thematiqueId, utilisateurId);
    presenter.present({
      ...missionThematique,
      idThematique: thematiqueId,
    });
  }
}
