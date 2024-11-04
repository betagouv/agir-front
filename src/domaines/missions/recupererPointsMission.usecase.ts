import { MissionEvent } from '@/domaines/missions/missionEventBus.impl';
import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { EventBus } from '@/shell/eventBus';

export class RecupererPointsMissionUsecase {
  constructor(
    private missionsRepository: MissionsRepository,
    private missionEventBus: EventBus<MissionEvent>,
  ) {}

  async execute(idUtilisateur: string, elementId: string): Promise<void> {
    await this.missionsRepository.recupererPoints(idUtilisateur, elementId);
    this.missionEventBus.publish(MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE);
  }
}
