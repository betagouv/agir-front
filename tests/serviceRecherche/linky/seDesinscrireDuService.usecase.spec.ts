import { SeDesinscrireDuServiceUsecase } from '@/domaines/serviceRecherche/linky/seDesinscrireDuService.usecase';
import { SpyLinkyEventBus } from '../../services/adapters/spyLinkyEventBus';
import { LinkyEvent } from '@/domaines/services/linkyEventBusImpl';
import { SpyServiceRechercheLinky } from './adapters/serviceRechercheLinky.repository.spy';

describe('Fichier de tests concernant la désinscirption au service linky', () => {
  it("En donnant un id d'utilisateur, doit appeler le repo et publier un evenement", async () => {
    // GIVEN
    const serviceRepositorySpy = new SpyServiceRechercheLinky();
    const linkyEventBusSpy = new SpyLinkyEventBus();
    const seDesinscrireDuServiceUsecase = new SeDesinscrireDuServiceUsecase(serviceRepositorySpy, linkyEventBusSpy);

    // WHEN
    await seDesinscrireDuServiceUsecase.execute('utilisateurId');

    // THEN
    expect(serviceRepositorySpy.seDesabonner).toBeTruthy();
    expect(linkyEventBusSpy.eventName).toBe(LinkyEvent.DESABONNEMENT);
  });
});
