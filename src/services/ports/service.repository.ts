import { Service } from '@/services/recupererServiceActifs.usecase';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';

export interface ServiceRepository {
  recupererServicesActifs(utilisateurId: string): Promise<Service[]>;
  recupererCatalogueServices(utilisateurId: string): Promise<ServiceCatalogue[]>;
  enleverServiceActif(utilisateurId, serviceId): Promise<void>;
}
