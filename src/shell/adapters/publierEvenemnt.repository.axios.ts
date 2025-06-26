import { AxiosFactory, intercept40X } from '@/axios.factory';
import { Evenemement, PublierEvenementRepository } from '@/shell/ports/publierEvenement.repository';

export class PublierEvenemntRepositoryAxios implements PublierEvenementRepository {
  @intercept40X()
  async publierEvenement(utilisateurId: string, evenement: Evenemement) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/${utilisateurId}/events`, { type: evenement });
  }
}
