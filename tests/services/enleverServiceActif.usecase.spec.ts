import { EnleverServiceActifUsecase } from '@/domaines/services/enleverServiceActif.usecase';
import { SpyServiceRepository } from './adapters/service.repository.spy';
import { ServiceEventBusSpy } from './serviceEventBusSpy';
import { ServiceEvent } from '@/domaines/services/serviceEventBusImpl';

describe("Fichier de tests concernant la suppression d'un service actif", () => {
  it('Quand on enleve un service actif doit appeler le repos et publier un evenenement SERVICE_SUPPRIME', async () => {
    // GIVEN
    const serviceEventBusSpy = new ServiceEventBusSpy();
    const serviceRepositorySpy = new SpyServiceRepository();
    const enleverServiceActifUsecase = new EnleverServiceActifUsecase(serviceRepositorySpy, serviceEventBusSpy);

    // WHEN
    await enleverServiceActifUsecase.execute('utilisateurId', 'serviceId');

    // THEN
    expect(serviceRepositorySpy.enleverServiceActifAEteAppele).toBeTruthy();
    expect(serviceEventBusSpy.eventName).toBe(ServiceEvent.SERVICE_SUPPRIME);
  });
});
