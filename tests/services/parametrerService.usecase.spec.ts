import { ParametrerServiceUsecase } from '@/domaines/services/parametrerService.usecase';
import { SpyServiceRepository } from './adapters/service.repository.spy';
import { SpyLinkyEventBus } from './adapters/spyLinkyEventBus';
import { LinkyEvent } from '@/domaines/services/linkyEventBusImpl';

describe("Fichier de tests concernant le paramétrage d'un service", () => {
  it('Quand on paramètre un service doit appeler le repo', async () => {
    // GIVEN
    const serviceRepositorySpy = new SpyServiceRepository();
    const linkyEventBusSpy = new SpyLinkyEventBus();
    const enleverServiceActifUsecase = new ParametrerServiceUsecase(serviceRepositorySpy, linkyEventBusSpy);

    // WHEN
    await enleverServiceActifUsecase.execute('utilisateurId', 'serviceId', {
      key1: 'valeur1',
      key2: 'valeur2',
    });

    // THEN
    expect(serviceRepositorySpy.parametrerServiceAEteAppele).toBeTruthy();
    expect(linkyEventBusSpy.eventName).toBe(LinkyEvent.PRM_A_ETE_SUBMIT);
  });
});
