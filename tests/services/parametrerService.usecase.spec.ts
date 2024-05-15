import { ParametrerServiceUsecase } from '@/domaines/services/parametrerService.usecase';
import { SpyServiceRepository } from './adapters/service.repository.spy';

describe("Fichier de tests concernant le paramétrage d'un service", () => {
  it('Quand on paramètre un service doit appeler le repo', async () => {
    // GIVEN
    const serviceRepositorySpy = new SpyServiceRepository();
    const enleverServiceActifUsecase = new ParametrerServiceUsecase(serviceRepositorySpy);

    // WHEN
    await enleverServiceActifUsecase.execute('utilisateurId', 'serviceId', {
      key1: 'valeur1',
      key2: 'valeur2',
    });

    // THEN
    expect(serviceRepositorySpy.parametrerServiceAEteAppele).toBeTruthy();
  });
});
