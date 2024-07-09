import { ServiceRecherchePresDeChezNousRepositoryMock } from './adapters/serviceRecherchePresDeChezNous.repository.mock';
import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';
import {
  ServiceRecherchePresDeChezNousPresenterImpl,
  ServiceRecherchePresDeChezNousViewModel,
} from '@/domaines/serviceRecherche/adapters/serviceRecherchePresDeChezNous.presenter.impl';

describe("Fichier de tests concernant la récuperation de service d'un recherche", () => {
  it("en donnant l'id d'un utilisateur et d'un service, renvoie les suggestions du service", () => {
    // GIVEN
    const usecase = new RecupererServicePresDeChezNousUsecase(
      new ServiceRecherchePresDeChezNousRepositoryMock({
        titre: 'Mon service',
        suggestions: [
          {
            titre: 'titre 1',
            adresse: '2 Avenue de la République, Palaiseau - 91120',
            nombreMiseEnFavoris: 12,
            distance: 282,
          },
          { titre: 'titre 2', adresse: undefined, nombreMiseEnFavoris: 0, distance: undefined },
          { titre: 'titre 3', adresse: undefined, nombreMiseEnFavoris: 0, distance: 2123 },
        ],
        favoris: [
          {
            titre: 'titre 1',
            adresse: '2 Avenue de la République, Palaiseau - 91120',
            nombreMiseEnFavoris: 12,
            distance: undefined,
          },
          { titre: 'titre 1', adresse: undefined, nombreMiseEnFavoris: 0, distance: undefined },
        ],
        categories: [
          { code: 'code', label: 'label', estLaCategorieParDefaut: true },
          { code: 'code', label: 'label', estLaCategorieParDefaut: false },
        ],
      }),
    );

    // WHEN
    usecase.execute('idUtilisateur', 'idService', new ServiceRecherchePresDeChezNousPresenterImpl(expectation));

    // THEN
    function expectation(serviceRecherchePresDeChezNousViewModel: ServiceRecherchePresDeChezNousViewModel) {
      expect(serviceRecherchePresDeChezNousViewModel).toStrictEqual<ServiceRecherchePresDeChezNousViewModel>({
        titre: 'Mon service',
        suggestions: [
          {
            titre: 'titre 1',
            description: '2 Avenue de la République, Palaiseau - 91120',
            nombreMiseEnFavoris: 12,
            img: '/ic_services.svg',
            tag: {
              label: 'À 282m',
              style: 'background--caramel text--background-caramel',
            },
          },
          { titre: 'titre 2', description: undefined, nombreMiseEnFavoris: 0, img: '/ic_services.svg', tag: undefined },
          {
            description: undefined,
            img: '/ic_services.svg',
            nombreMiseEnFavoris: 0,
            tag: {
              label: 'À 2,1km',
              style: 'background--caramel text--background-caramel',
            },
            titre: 'titre 3',
          },
        ],
        favoris: [
          {
            titre: 'titre 1',
            description: '2 Avenue de la République, Palaiseau - 91120',
            nombreMiseEnFavoris: 12,
            img: '/ic_services.svg',
          },
          { titre: 'titre 1', description: undefined, nombreMiseEnFavoris: 0, img: '/ic_services.svg' },
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
