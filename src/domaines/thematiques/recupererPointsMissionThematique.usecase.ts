import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { ThematiqueEvent } from '@/domaines/thematiques/thematiqueEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class RecupererPointsMissionThematiqueUsecase {
  constructor(
    private thematiqueRepository: MissionsRepository,
    private thematiqueEventBus: EventBus<ThematiqueEvent>,
  ) {}

  async execute(idUtilisateur: string, elementId: string): Promise<void> {
    await this.thematiqueRepository.recupererPoints(idUtilisateur, elementId);
    this.thematiqueEventBus.publish(ThematiqueEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE);
  }
}
