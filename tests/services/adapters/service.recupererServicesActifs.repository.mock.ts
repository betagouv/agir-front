import { ServiceRepository } from '@/services/ports/service.repository';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';
import { Service } from '@/services/recupererServiceActifs.usecase';

export class MockRecupererServicesActifsRepository implements ServiceRepository {
  constructor(private catalogueServicesActifsARetourner: Service[]) {}

  recupererCatalogueServices(_utilisateurId: string): Promise<ServiceCatalogue[]> {
    throw Error;
  }

  parametrerService(utilisateurId: string, serviceId: string, parametres: { [key: string]: string }): Promise<void> {
    throw Error;
  }

  recupererServicesActifs(_utilisateurId: string): Promise<Service[]> {
    return Promise.resolve(this.catalogueServicesActifsARetourner);
  }

  enleverServiceActif(_utilisateurId, _serviceId): Promise<void> {
    throw Error;
  }

  installerServiceActif(_utilisateurId, _serviceId): Promise<void> {
    throw Error;
  }
}
