import { ServiceEvent, ServiceEventBus } from '@/services/serviceEventBusImpl';
import { EnleverServiceActifUsecase } from '@/services/enleverServiceActif.usecase';
import { ServiceRepository } from '@/services/ports/service.repository';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';
import { Service } from '@/services/recupererServiceActifs.usecase';
import { expect } from 'vitest';

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
  get enleverServiceActifAEteAppele(): boolean {
    return this._enleverServiceActifAEteAppele;
  }
  private _enleverServiceActifAEteAppele: boolean = false;
  enleverServiceActif(utilisateurId, serviceId): Promise<void> {
    this._enleverServiceActifAEteAppele = true;
    return Promise.resolve();
  }

  recupererCatalogueServices(utilisateurId: string): Promise<ServiceCatalogue[]> {
    throw Error;
  }

  recupererServicesActifs(utilisateurId: string): Promise<Service[]> {
    throw Error;
  }
}

describe("Fichier de tests concernant la suppression d'un service actif", () => {
  it('Quand on enlever un service actif doit appel le repos et publier un evenenement SERVICE_SUPPRIME', async () => {
    // GIVEN
    const serviceEventBusSpy = new ServiceEventBusSpy();
    const serviceRepositoryMock = new ServiceRepositoryMock();
    const enleverServiceActifUsecase = new EnleverServiceActifUsecase(serviceRepositoryMock, serviceEventBusSpy);
    // WHEN
    await enleverServiceActifUsecase.execute('utilisateurId', 'serviceId');
    // THEN
    expect(serviceRepositoryMock.enleverServiceActifAEteAppele).toBe(true);
    expect(serviceEventBusSpy.eventName).toBe(ServiceEvent.SERVICE_SUPPRIME);
  });
});
