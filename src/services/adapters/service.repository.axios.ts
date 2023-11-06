import { ServiceRepository } from '@/services/ports/service.repository';
import { Service } from '@/services/recupererServiceActifs.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface ServiceApiModel {
  label: string;
  url: string;
  is_url_externe: boolean;
}
export class ServiceRepositoryAxios implements ServiceRepository {
  @intercept401()
  async recupererServicesActifs(utilisateurId: string): Promise<Service[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const data = await axiosInstance.get<ServiceApiModel[]>(`/utilisateurs/${utilisateurId}/services`);
    return data.data.map(service => {
      return {
        label: service.label,
        url: service.url,
        isUrlExterne: service.is_url_externe,
      };
    });
  }
}
