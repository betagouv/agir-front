import { AxiosFactory, intercept401 } from '@/axios.factory';
import { CelebrationRepository } from '@/celebration/ports/celebration.repository';

export class CelebrationRepositoryAxios implements CelebrationRepository {
  @intercept401()
  async valider(utilisateurId: string, celebrationId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'celebration',
      celebration_id: celebrationId,
    });
  }
}
