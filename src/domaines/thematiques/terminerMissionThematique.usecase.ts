import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';

export class TerminerMissionThematiqueUsecase {
  constructor(private readonly thematiqueRepository: ThematiqueRepository) {}

  async execute(thematiqueId: string, utilisateurId: string): Promise<void> {
    await this.thematiqueRepository.terminerMission(utilisateurId, thematiqueId);
  }
}
