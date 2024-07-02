import { Service } from '@/domaines/services/installerServiceActif.usecase';
import { ServiceRepository } from '@/domaines/services/ports/service.repository';
import { ServiceCatalogue } from '@/domaines/services/recupererCatalogueServices.usecase';

export class SpyServiceRepository implements ServiceRepository {
  private _installerServiceActifAEteAppele: boolean = false;

  private _enleverServiceActifAEteAppele: boolean = false;

  private _parametrerServiceAEteAppele: boolean = false;

  get installerServiceActifAEteAppele(): boolean {
    return this._installerServiceActifAEteAppele;
  }

  get enleverServiceActifAEteAppele(): boolean {
    return this._enleverServiceActifAEteAppele;
  }

  get parametrerServiceAEteAppele(): boolean {
    return this._parametrerServiceAEteAppele;
  }

  enleverServiceActif(_utilisateurId: string, _serviceId: string): Promise<void> {
    this._enleverServiceActifAEteAppele = true;
    return Promise.resolve();
  }

  recupererCatalogueServices(utilisateurId: string): Promise<ServiceCatalogue[]> {
    throw Error;
  }

  recupererServicesActifs(utilisateurId: string): Promise<Service[]> {
    throw Error;
  }

  installerServiceActif(_utilisateurId: string, _serviceId: string): Promise<void> {
    this._installerServiceActifAEteAppele = true;
    return Promise.resolve();
  }

  parametrerService(_utilisateurId: string, _serviceId: string, _parametres: { [key: string]: string }): Promise<void> {
    this._parametrerServiceAEteAppele = true;
    return Promise.resolve();
  }
}
