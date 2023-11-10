import { ServiceEvent, ServiceEventBus } from '@/services/serviceEventBusImpl';
import { ServiceRepository } from '@/services/ports/service.repository';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';
import { Service } from '@/services/recupererServiceActifs.usecase';
import { expect } from 'vitest';
import { InstallerServiceActifUsecase } from '@/services/installerServiceActif.usecase';

class ServiceEventBusSpy implements ServiceEventBus {
  get eventName(): ServiceEvent | null {
    return this._eventName;
  }
  private _eventName: ServiceEvent | null = null;

  publish(eventName: ServiceEvent): void {
    this._eventName = eventName;
  }

  subscribe(eventName: ServiceEvent, callback: () => void): void {}
}

class ServiceRepositoryMock implements ServiceRepository {
  get installerServiceActifAEteAppele(): boolean {
    return this._installerServiceActifAEteAppele;
  }
  private _installerServiceActifAEteAppele: boolean = false;
  enleverServiceActif(utilisateurId, serviceId): Promise<void> {
    throw Error;
  }

  recupererCatalogueServices(utilisateurId: string): Promise<ServiceCatalogue[]> {
    throw Error;
  }

  recupererServicesActifs(utilisateurId: string): Promise<Service[]> {
    throw Error;
  }

  installerServiceActif(utilisateurId, serviceId): Promise<void> {
    this._installerServiceActifAEteAppele = true;
    return Promise.resolve();
  }
}

describe("Fichier de tests concernant l'installation d'un service actif", () => {
  it('Quand on installer un service actif doit appeler le repos et publier un evenenement SERVICE_INSTALLE', async () => {
    // GIVEN
    const serviceEventBusSpy = new ServiceEventBusSpy();
    const serviceRepositoryMock = new ServiceRepositoryMock();
    const installerServiceActifUsecase = new InstallerServiceActifUsecase(serviceRepositoryMock, serviceEventBusSpy);
    // WHEN
    await installerServiceActifUsecase.execute('utilisateurId', 'serviceId');
    // THEN
    expect(serviceRepositoryMock.installerServiceActifAEteAppele).toBe(true);
    expect(serviceEventBusSpy.eventName).toBe(ServiceEvent.SERVICE_INSTALLE);
  });
});
