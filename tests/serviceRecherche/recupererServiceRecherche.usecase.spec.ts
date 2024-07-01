import {
  ServiceRecherchePresenterImpl,
  ServiceRechercheViewModel,
} from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';
import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';
import {
  RecupererServiceRechercheUsecase,
  ServiceRecherche,
} from '@/domaines/serviceRecherche/recupererServiceRecherche.usecase';

class ServiceRechercheRepositoryMock implements ServiceRechercheRepository {
  getService(idUtilisateur: string, idService: string): Promise<ServiceRecherche> {
    return Promise.resolve({
      titre: 'Mon service',
      suggestions: [
        {
          titre: 'titre 1',
          adresse: '2 Avenue de la République, Palaiseau - 91120',
          nombreMiseEnFavoris: 12,
        },
        { titre: 'titre 1', adresse: undefined, nombreMiseEnFavoris: 0 },
      ],
    });
  }
}

describe("Fichier de tests concernant la récuperation de service d'un recherche", () => {
  it("en donnant l'id d'un utilisateur et d'un service, renvoie les suggestions du service", () => {
    // GIVEN

    // WHEN
    const usecase = new RecupererServiceRechercheUsecase(new ServiceRechercheRepositoryMock());
    usecase.execute('idUtilisateur', 'idService', new ServiceRecherchePresenterImpl(expectation));

    // THEN
    function expectation(catalogueViewModel: ServiceRechercheViewModel) {
      expect(catalogueViewModel).toStrictEqual<ServiceRechercheViewModel>({
        titre: 'Mon service',
        carousel: undefined,
        suggestions: [
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
      });
    }
  });
});
