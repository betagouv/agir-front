import { UniversRepositoryMock } from './adapters/univers.repository.inmemory';
import { RecupererUniversUsecase } from '@/univers/recupererUnivers.usecase';
import { UniversPresenterImpl } from '@/univers/adapters/univers.presenter.impl';
import { UniversViewModel } from '@/univers/adapters/listeUnivers.presenter.impl';

describe("Fichier de tests concernant la récupération d'un univers", async () => {
  it('En donnant un id utilisateur et un id univers doit récupérer un univers', async () => {
    // GIVEN
    const usecase = new RecupererUniversUsecase(new UniversRepositoryMock());
    // WHEN
    await usecase.execute('idUtilisateur', 'idUnivers', new UniversPresenterImpl(expectation));
    // THEN
    function expectation(univers: UniversViewModel) {
      expect(univers).toStrictEqual<UniversViewModel>({
        id: '1',
        nom: 'Le climat',
        urlImage: 'https://via.placeholder.com/150',
        nombreDeDefisRealises: 0,
      });
    }
  });
});
