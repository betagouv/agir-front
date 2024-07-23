import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceRepository } from '@/domaines/services/ports/service.repository';

export interface ServiceApiModel {
  id: string;
  titre: string;
  label: string;
  url: string;
  is_url_externe: boolean;
}

export class ServiceRepositoryAxios implements ServiceRepository {
  @intercept401()
  async parametrerService(
    utilisateurId: string,
    serviceId: string,
    parametres: { [key: string]: string },
  ): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.put(`/utilisateurs/${utilisateurId}/services/${serviceId}/configuration`, parametres);
  }
}
