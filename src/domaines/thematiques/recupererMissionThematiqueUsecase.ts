import { MissionThematiquePresenter } from '@/domaines/thematiques/ports/missionThematique.presenter';
import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';

export interface MissionItem {
  id: string;
  contentId: string;
  titre: string;
  progression: number;
  estBloquee: boolean;
  points: number;
  aEteRealisee: boolean;
  type: string;
}

export interface MissionThematique {
  urlImage: string;
  titre: string;
  items: MissionItem[];
  idThematique: string;
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
