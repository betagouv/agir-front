import { ServiceRepository } from '@/services/ports/service.repository';
import { Service } from '@/services/recupererServiceActifs.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';

interface ServiceApiModel {
  label: string;
  url: string;
  is_url_externe: boolean;
}

interface ServiceCatalogueApiModel {
  id: string;
  titre: string;
  url: string;
  thematiques: string[];
  nombre_installation: number;
  icon_url: string;
  image_url: string;
  is_installed: boolean;
}
export class ServiceRepositoryAxios implements ServiceRepository {
  @intercept401()
  async recupererServicesActifs(utilisateurId: string): Promise<Service[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<ServiceApiModel[]>(`/utilisateurs/${utilisateurId}/services`);
    return reponse.data.map(service => ({
      label: service.label,
      url: service.url,
      isUrlExterne: service.is_url_externe,
    }));
  }

  @intercept401()
  async recupererCatalogueServices(utilisateurId: string): Promise<ServiceCatalogue[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<ServiceCatalogueApiModel[]>(`/services?utilisateurId=${utilisateurId}`);
    return reponse.data.map(service => ({
      id: service.id,
      titre: service.titre,
      url: service.url,
      thematiques: service.thematiques,
      nombreInstallation: service.nombre_installation,
      icon: service.icon_url,
      description: '',
      sousDescription: '',
      estInstalle: service.is_installed,
      image: service.image_url,
    }));
  }

  @intercept401()
  async enleverServiceActif(utilisateurId: string, serviceId: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.delete(`/utilisateurs/${utilisateurId}/services/${serviceId}`);
  }
}
