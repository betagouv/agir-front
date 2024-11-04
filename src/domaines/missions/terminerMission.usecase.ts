import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';

export class TerminerMissionUsecase {
  constructor(private readonly missionsRepository: MissionsRepository) {}

  async execute(missionId: string, utilisateurId: string): Promise<void> {
    await this.missionsRepository.terminerMission(utilisateurId, missionId);
  }
}
