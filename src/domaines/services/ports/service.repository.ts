import { ServiceCatalogue } from '@/domaines/services/recupererCatalogueServices.usecase';
import { Service } from '@/domaines/services/recupererServiceActifs.usecase';

export interface ServiceRepository {
  recupererServicesActifs(utilisateurId: string): Promise<Service[]>;
  recupererCatalogueServices(utilisateurId: string): Promise<ServiceCatalogue[]>;
  enleverServiceActif(utilisateurId, serviceId): Promise<void>;
  installerServiceActif(utilisateurId, serviceId): Promise<void>;
  parametrerService(utilisateurId: string, serviceId: string, parametres: { [key: string]: string }): Promise<void>;
}
