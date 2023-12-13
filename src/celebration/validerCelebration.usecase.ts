import { CelebrationRepository } from '@/celebration/ports/celebration.repository';

export class ValiderCelebrationUsecase {
  constructor(private celebrationRepository: CelebrationRepository) {}

  async execute(utilisateurId: string, celebrationId: string) {
    await this.celebrationRepository.valider(utilisateurId, celebrationId);
  }
}
