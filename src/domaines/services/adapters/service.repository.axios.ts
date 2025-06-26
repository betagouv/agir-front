import { AxiosFactory, intercept40X } from '@/axios.factory';
import { ServiceRepository } from '@/domaines/services/ports/service.repository';

export interface ServiceApiModel {
  id: string;
  titre: string;
  label: string;
  url: string;
  is_url_externe: boolean;
}

export class ServiceRepositoryAxios implements ServiceRepository {
  @intercept40X()
  async parametrerService(
    utilisateurId: string,
    serviceId: string,
    parametres: { [key: string]: string },
  ): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.put(`/utilisateurs/${utilisateurId}/services/${serviceId}/configuration`, parametres);
  }
}
