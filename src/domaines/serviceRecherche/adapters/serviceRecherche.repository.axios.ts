import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';
import { ServicesRecherche } from '@/domaines/serviceRecherche/recupererServicesRechercheParUnivers.usecase';

interface ServiceRechercheApiModel {
  id_service: string;
  titre: string;
  sous_titre: string;
  external_url: string;
  icon_url: string;
  is_available_inhouse: boolean;
}

export class ServiceRechercheRepositoryAxios implements ServiceRechercheRepository {
  @intercept401()
  async recupererServicesParUnivers(idUtilisateur: string, univers: string): Promise<ServicesRecherche> {
    const axiosInstance = AxiosFactory.getAxios();

    const response = await axiosInstance.get<ServiceRechercheApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${univers}`,
    );

    return {
      services: response.data.map(service => ({
        id: service.id_service,
        titre: service.titre,
        sous_titre: service.sous_titre,
        externalUrl: service.external_url,
        iconUrl: service.icon_url,
        estServiceExterne: !service.is_available_inhouse,
      })),
    };
  }
}
