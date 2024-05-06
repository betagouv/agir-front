import { InteractionType } from '@/shell/interactionType';
import { MissionThematiquePresenter } from '@/thematiques/ports/missionThematique.presenter';
import { ThematiqueRepository } from '@/thematiques/ports/thematique.repository';

export interface MissionItem {
  contentId: string;
  titre: string;
  progression: number;
  estBloquee: boolean;
  points: number;
  aEteRealisee: boolean;
  type: InteractionType;
}
export interface MissionThematique {
  urlImage: string;
  titre: string;
  items: MissionItem[];
}

export class RecupererMissionThematiqueUsecase {
  constructor(private thematiqueRepository: ThematiqueRepository) {}

  async execute(universId: string, utilisateurId: string, presenter: MissionThematiquePresenter): Promise<void> {
    const missionThematique = await this.thematiqueRepository.recupererMissionThematique(universId, utilisateurId);
    presenter.present(missionThematique);
  }
}
