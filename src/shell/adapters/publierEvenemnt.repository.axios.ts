import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Evenemement, PublierEvenementRepository } from '@/shell/ports/publierEvenement.repository';

export class PublierEvenemntRepositoryAxios implements PublierEvenementRepository {
  @intercept401()
  async publierEvenement(utilisateurId: string, evenement: Evenemement) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/${utilisateurId}/events`, { type: evenement });
  }
}
