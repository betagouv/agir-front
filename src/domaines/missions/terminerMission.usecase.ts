import { MissionEvent } from '@/domaines/missions/missionEventBus.impl';
import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { EventBus } from '@/shell/eventBus';

export class TerminerMissionUsecase {
  constructor(
    private readonly missionsRepository: MissionsRepository,
    private missionEventBus: EventBus<MissionEvent>,
  ) {}

  async execute(missionId: string, utilisateurId: string): Promise<void> {
    await this.missionsRepository.terminerMission(utilisateurId, missionId);
    this.missionEventBus.publish(MissionEvent.MISSION_TERMINEE);
  }
}
