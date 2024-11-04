import { ThematiquesRepositoryMock } from './adapters/univers.repository.mock';
import { RecupererThematiqueUsecase } from '@/domaines/thematiques/recupererThematique.usecase';
import {
  ThematiquePresenterImpl,
  ThematiqueViewModel,
} from '@/domaines/thematiques/adapters/thematique.presenter.impl';

describe("Fichier de tests concernant la récupération d'une thématique", async () => {
  it('En donnant un id utilisateur et un id thématique doit récupérer la thématique', async () => {
    // GIVEN
    const usecase = new RecupererThematiqueUsecase(new ThematiquesRepositoryMock());
    // WHEN
    await usecase.execute('idUtilisateur', 'idThematique', new ThematiquePresenterImpl(expectation));
    // THEN
    function expectation(univers: ThematiqueViewModel) {
      expect(univers).toStrictEqual<ThematiqueViewModel>({
        id: '1',
        nom: 'Le climat',
        urlImage: 'https://via.placeholder.com/150',
      });
    }
  });
});
