import { UniversRepositoryMock } from './adapters/univers.repository.inmemory';
import { RecupererUniversUsecase } from '@/domaines/univers/recupererUnivers.usecase';
import { UniversPresenterImpl } from '@/domaines/univers/adapters/univers.presenter.impl';
import { UniversViewModel } from '@/domaines/univers/adapters/listeUnivers.presenter.impl';

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
        estBloque: false,
      });
    }
  });
});
