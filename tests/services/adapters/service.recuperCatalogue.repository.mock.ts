import { ServiceRepository } from '@/services/ports/service.repository';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';
import { Service } from '@/services/recupererServiceActifs.usecase';

export class MockRecupererCatalogueServiceRepository implements ServiceRepository {
  constructor(private catalogueServicesARetourner: ServiceCatalogue[]) {}

  recupererCatalogueServices(_utilisateurId: string): Promise<ServiceCatalogue[]> {
    return Promise.resolve(this.catalogueServicesARetourner);
  }

  parametrerService(utilisateurId: string, serviceId: string, parametres: string[]): Promise<void> {
    throw Error;
  }

  recupererServicesActifs(_utilisateurId: string): Promise<Service[]> {
    throw Error;
  }

  enleverServiceActif(_utilisateurId, _serviceId): Promise<void> {
    throw Error;
  }

  installerServiceActif(_utilisateurId, _serviceId): Promise<void> {
    throw Error;
  }
}
