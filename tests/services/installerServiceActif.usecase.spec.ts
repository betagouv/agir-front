import { InstallerServiceActifUsecase } from '@/domaines/services/installerServiceActif.usecase';
import { ServiceEvent } from '@/domaines/services/serviceEventBusImpl';
import { SpyServiceRepository } from './adapters/service.repository.spy';
import { ServiceEventBusSpy } from './serviceEventBusSpy';

describe("Fichier de tests concernant l'installation d'un service actif", () => {
  it('Quand on installer un service actif doit appeler le repos et publier un evenenement SERVICE_INSTALLE', async () => {
    // GIVEN
    const serviceEventBusSpy = new ServiceEventBusSpy();
    const serviceRepositorySpy = new SpyServiceRepository();
    const installerServiceActifUsecase = new InstallerServiceActifUsecase(serviceRepositorySpy, serviceEventBusSpy);

    // WHEN
    await installerServiceActifUsecase.execute('utilisateurId', 'serviceId');

    // THEN
    expect(serviceRepositorySpy.installerServiceActifAEteAppele).toBeTruthy();
    expect(serviceEventBusSpy.eventName).toBe(ServiceEvent.SERVICE_INSTALLE);
  });
});
