import { CelebrationRepository } from '@/domaines/celebration/ports/celebration.repository';

export class ValiderCelebrationUsecase {
  constructor(private celebrationRepository: CelebrationRepository) {}

  async execute(utilisateurId: string, celebrationId: string) {
    await this.celebrationRepository.valider(utilisateurId, celebrationId);
  }
}
