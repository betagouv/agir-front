import {
  ServiceRecherchePresDeChezNousRepositoryEnErreur,
  ServiceRecherchePresDeChezNousRepositoryMock,
} from './adapters/serviceRecherchePresDeChezNous.repository.mock';
import { RecupererServicePresDeChezNousUsecase } from '../../../src/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
import {
  ServiceRecherchePresDeChezNousPresenterImpl,
  ServiceRecherchePresDeChezNousViewModel,
} from '../../../src/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';
import { RouteServiceName } from '../../../src/router/services/routes';

describe("Fichier de tests concernant la récuperation de service d'un recherche", () => {
  it("en donnant l'id d'un utilisateur et d'un service, renvoie les suggestions du service", async () => {
    // GIVEN
    const usecase = new RecupererServicePresDeChezNousUsecase(
      ServiceRecherchePresDeChezNousRepositoryMock.recupererServiceMock({
        estEnErreur: false,
        titre: 'Mon service',
        suggestions: [
          {
            id: 'id1',
            titre: 'titre 1',
            adresse: '2 Avenue de la République, Palaiseau - 91120',
            nombreMiseEnFavoris: 12,
            distance: 282,
            image: '',
          },
          {
            id: 'id2',
            titre: 'titre 2',
            adresse: undefined,
            nombreMiseEnFavoris: 0,
            distance: undefined,
            image: '',
          },
          {
            id: 'id3',
            titre: 'titre 3',
            adresse: undefined,
            nombreMiseEnFavoris: 0,
            distance: 2123,
            image: '',
          },
        ],
        favoris: [
          {
            id: 'id4',
            image: '',
            titre: 'titre 1',
            adresse: '2 Avenue de la République, Palaiseau - 91120',
            nombreMiseEnFavoris: 12,
            distance: undefined,
          },
          {
            id: 'id5',
            titre: 'titre 1',
            adresse: undefined,
            nombreMiseEnFavoris: 0,
            distance: undefined,
            image: '',
          },
        ],
        categories: [
          { code: 'code', label: 'label', estLaCategorieParDefaut: true },
          { code: 'code', label: 'label', estLaCategorieParDefaut: false },
        ],
        plusDeResultatsDisponibles: false,
      }),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'idService',
      5,
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm =>
          expect(vm).toStrictEqual<ServiceRecherchePresDeChezNousViewModel>({
            aucunResultat: false,
            suggestions: [
              {
                id: 'id1',
                titre: 'titre 1',
                description: '2 Avenue de la République, Palaiseau - 91120',
                nombreMiseEnFavoris: 12,
                headerAlternatif: {
                  backgroundColor: '#fff0e6',
                  emoji: '🥘',
                },
                tag: {
                  label: 'À 300 m',
                  style: 'background--caramel text--background-caramel',
                },
                to: {
                  name: RouteServiceName.PROXIMITE_DETAIL,
                  params: { id: 'id1' },
                },
              },
              {
                id: 'id2',
                titre: 'titre 2',
                description: undefined,
                nombreMiseEnFavoris: 0,
                headerAlternatif: {
                  backgroundColor: '#fff0e6',
                  emoji: '🥘',
                },
                tag: undefined,
                to: {
                  name: RouteServiceName.PROXIMITE_DETAIL,
                  params: { id: 'id2' },
                },
              },
              {
                id: 'id3',
                description: undefined,
                headerAlternatif: {
                  backgroundColor: '#fff0e6',
                  emoji: '🥘',
                },
                nombreMiseEnFavoris: 0,
                tag: {
                  label: 'À 2,1 km',
                  style: 'background--caramel text--background-caramel',
                },
                titre: 'titre 3',
                to: {
                  name: RouteServiceName.PROXIMITE_DETAIL,
                  params: { id: 'id3' },
                },
              },
            ],
            favoris: [
              {
                id: 'id4',
                titre: 'titre 1',
                description: '2 Avenue de la République, Palaiseau - 91120',
                nombreMiseEnFavoris: 12,
                img: '/ic_services.svg',
                to: {
                  name: RouteServiceName.PROXIMITE_DETAIL,
                  params: { id: 'id4' },
                },
              },
              {
                id: 'id5',
                titre: 'titre 1',
                description: undefined,
                nombreMiseEnFavoris: 0,
                img: '/ic_services.svg',
                to: {
                  name: RouteServiceName.PROXIMITE_DETAIL,
                  params: { id: 'id5' },
                },
              },
            ],
            aside: {
              nom: 'Près de chez nous',
              description:
                'Près de chez nous est une cartographie collaborative qui recense l’ensemble des structures qui proposent des produits bio, équitables et locaux.',
              urlLabel: 'https://presdecheznous.fr/',
              url: 'https://presdecheznous.fr/',
              logo: '/service-proximite-logo.webp',
              screenshot: '/service-proximite.webp',
            },
            categories: [
              { code: 'code', label: 'label', estLaCategorieParDefaut: true },
              { code: 'code', label: 'label', estLaCategorieParDefaut: false },
            ],
            plusDeResultatsDisponibles: false,
          }),
        error => expect(error).toEqual(null),
      ),
    );
  });

  it("quand il n'y a pas de suggestions, renvoie aucun resultat", async () => {
    // GIVEN
    const usecase = new RecupererServicePresDeChezNousUsecase(
      ServiceRecherchePresDeChezNousRepositoryMock.recupererServiceMock({
        titre: 'Mon service',
        suggestions: [],
        favoris: [],
        categories: [
          { code: 'code', label: 'label', estLaCategorieParDefaut: true },
          { code: 'code', label: 'label', estLaCategorieParDefaut: false },
        ],
        estEnErreur: false,
        plusDeResultatsDisponibles: false,
      }),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'idService',
      5,
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm =>
          expect(vm).toStrictEqual<ServiceRecherchePresDeChezNousViewModel>({
            aucunResultat: true,
            aside: {
              nom: 'Près de chez nous',
              description:
                'Près de chez nous est une cartographie collaborative qui recense l’ensemble des structures qui proposent des produits bio, équitables et locaux.',
              urlLabel: 'https://presdecheznous.fr/',
              url: 'https://presdecheznous.fr/',
              logo: '/service-proximite-logo.webp',
              screenshot: '/service-proximite.webp',
            },
            categories: [
              { code: 'code', label: 'label', estLaCategorieParDefaut: true },
              { code: 'code', label: 'label', estLaCategorieParDefaut: false },
            ],
          }),
        error => expect(error).toEqual(null),
      ),
    );
  });

  it("quand il y a une erreur, affiche un message d'erreur", async () => {
    // GIVEN
    const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousRepositoryEnErreur());

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'idService',
      5,
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm => expect(vm).toEqual(null),

        error =>
          expect(error).toEqual(
            'Le service prend plus de temps que prévu à répondre. Merci de recharger la page ou réessayer plus tard.',
          ),
      ),
    );
  });
});
