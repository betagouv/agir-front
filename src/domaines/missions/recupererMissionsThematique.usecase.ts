import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';

export class RecupererMissionsThematiqueUsecase {
  constructor(private readonly missionsRepository: MissionsRepository) {}

  async execute(thematiqueId: string, utilisateurId: string, presenter: MissionsPresenter): Promise<void> {
    const missions = await this.missionsRepository.recupererMissionsThematique(thematiqueId, utilisateurId);
    presenter.presente(missions);
  }
}

export interface Mission {
  titre: string;
  id: string;
  estUnExamen: boolean;
  progression: {
    etapeActuelle: number;
    etapeCible: number;
  };
  estNouvelle: boolean;
  urlImage: string;
  thematiqueParent: {
    clefAPI: string;
    label: string;
  };
}
