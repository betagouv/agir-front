import { ListeUniversPresenterImpl, ListeUniversViewModel } from '@/univers/adapters/listeUnivers.presenter.impl';
import { RecupererListeUniversUsecase } from '@/univers/recupererListeUnivers.usecase';
import { UniversRepositoryMock } from './adapters/univers.repository.inmemory';

describe('Fichier de tests concernant la recupération des univers', () => {
  it('En donnant un id utilisateur, doit récupérer la liste des univers', async () => {
    // GIVEN
    const usecase = new RecupererListeUniversUsecase(new UniversRepositoryMock());
    // WHEN
    await usecase.execute('id', new ListeUniversPresenterImpl(expectation));
    // THEN
    function expectation(univers: ListeUniversViewModel) {
      expect(univers).toStrictEqual<ListeUniversViewModel>({
        univers: [
          {
            id: '1',
            nom: 'Le climat',
            urlImage: 'https://via.placeholder.com/150',
            nombreDeDefisRealises: 0,
          },
          {
            id: '2',
            nom: 'En cuisine',
            urlImage: 'https://via.placeholder.com/150',
            nombreDeDefisRealises: 0,
          },
        ],
      });
    }
  });
});
