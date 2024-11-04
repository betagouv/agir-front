import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';

export class TerminerMissionThematiqueUsecase {
  constructor(private readonly thematiqueRepository: MissionsRepository) {}

  async execute(thematiqueId: string, utilisateurId: string): Promise<void> {
    await this.thematiqueRepository.terminerMission(utilisateurId, thematiqueId);
  }
}
