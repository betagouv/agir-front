import {
  ServiceRecherchePresenterImpl,
  ServiceRechercheViewModel,
} from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';
import { RecupererServiceRechercheUsecase } from '@/domaines/serviceRecherche/recupererServiceRecherche.usecase';
import { ServiceRechercheRepositoryMock } from './adapters/serviceRecherche.repository.mock';

describe("Fichier de tests concernant la récuperation de service d'un recherche", () => {
  it("en donnant l'id d'un utilisateur et d'un service, renvoie les suggestions du service", () => {
    // GIVEN
    const usecase = new RecupererServiceRechercheUsecase(
      new ServiceRechercheRepositoryMock({
        titre: 'Mon service',
        suggestions: [
          {
            titre: 'titre 1',
            adresse: '2 Avenue de la République, Palaiseau - 91120',
            nombreMiseEnFavoris: 12,
          },
          { titre: 'titre 1', adresse: undefined, nombreMiseEnFavoris: 0 },
        ],
        favoris: [
          {
            titre: 'titre 1',
            adresse: '2 Avenue de la République, Palaiseau - 91120',
            nombreMiseEnFavoris: 12,
          },
          { titre: 'titre 1', adresse: undefined, nombreMiseEnFavoris: 0 },
        ],
        categories: [
          { code: 'code', label: 'label', estLaCategorieParDefaut: true },
          { code: 'code', label: 'label', estLaCategorieParDefaut: false },
        ],
      }),
    );

    // WHEN
    usecase.execute('idUtilisateur', 'idService', new ServiceRecherchePresenterImpl(expectation));

    // THEN
    function expectation(catalogueViewModel: ServiceRechercheViewModel) {
      expect(catalogueViewModel).toStrictEqual<ServiceRechercheViewModel>({
        titre: 'Mon service',
        suggestions: [
          { titre: 'titre 1', description: '2 Avenue de la République, Palaiseau - 91120', nombreMiseEnFavoris: 12 },
          { titre: 'titre 1', description: undefined, nombreMiseEnFavoris: 0 },
        ],
        favoris: [
          { titre: 'titre 1', description: '2 Avenue de la République, Palaiseau - 91120', nombreMiseEnFavoris: 12 },
          { titre: 'titre 1', description: undefined, nombreMiseEnFavoris: 0 },
        ],
        aside: {
          nom: 'Mon service lorem',
          description: 'Ceci est la description de mon service',
          url: 'url',
          logo: 'logo',
          screenshot: 'screenshot',
        },
        categories: [
          { code: 'code', label: 'label', estLaCategorieParDefaut: true },
          { code: 'code', label: 'label', estLaCategorieParDefaut: false },
        ],
      });
    }
  });
});
