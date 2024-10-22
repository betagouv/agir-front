import {
  ServiceRechercheLongueVieAuxObjetsRepositoryEnErreur,
  ServiceRechercheLongueVieAuxObjetsRepositoryMock,
} from './adapters/serviceRechercheLongueVieAuxObjets.repository.mock';
import { RecupererServiceLongueVieAuxObjetsUsecase } from '../../../src/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
import {
  ServiceRechercheLongueVieAuxObjetsPresenterImpl,
  ServiceRechercheLongueVieAuxObjetsViewModel,
} from '../../../src/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.presenter.impl';
import { RouteServiceName } from '../../../src/router/services/routes';

describe("Fichier de tests concernant la récuperation de service d'un recherche", () => {
  it("en donnant l'id d'un utilisateur et d'un service, renvoie les suggestions du service", async () => {
    // GIVEN
    const usecase = new RecupererServiceLongueVieAuxObjetsUsecase(
      ServiceRechercheLongueVieAuxObjetsRepositoryMock.recupererServiceMock({
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
      }),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'idService',
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm =>
          expect(vm).toStrictEqual<ServiceRechercheLongueVieAuxObjetsViewModel>({
            aucunResultat: false,
            suggestions: [
              {
                id: 'id1',
                titre: 'titre 1',
                description: '2 Avenue de la République, Palaiseau - 91120',
                nombreMiseEnFavoris: 12,
                img: '/ic_service_longue_vie_aux_objets.svg',
                tag: {
                  label: 'À 300 m',
                  style: 'background--caramel text--background-caramel',
                },
                to: {
                  name: RouteServiceName.LONGUE_VIE_AUX_OBJETS_DETAIL,
                  params: { id: 'id1' },
                },
              },
              {
                id: 'id2',
                titre: 'titre 2',
                description: undefined,
                nombreMiseEnFavoris: 0,
                img: '/ic_service_longue_vie_aux_objets.svg',
                tag: undefined,
                to: {
                  name: RouteServiceName.LONGUE_VIE_AUX_OBJETS_DETAIL,
                  params: { id: 'id2' },
                },
              },
              {
                id: 'id3',
                description: undefined,
                img: '/ic_service_longue_vie_aux_objets.svg',
                nombreMiseEnFavoris: 0,
                tag: {
                  label: 'À 2,1 km',
                  style: 'background--caramel text--background-caramel',
                },
                titre: 'titre 3',
                to: {
                  name: RouteServiceName.LONGUE_VIE_AUX_OBJETS_DETAIL,
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
                img: '/ic_service_longue_vie_aux_objets.svg',
                to: {
                  name: RouteServiceName.LONGUE_VIE_AUX_OBJETS_DETAIL,
                  params: { id: 'id4' },
                },
              },
              {
                id: 'id5',
                titre: 'titre 1',
                description: undefined,
                nombreMiseEnFavoris: 0,
                img: '/ic_service_longue_vie_aux_objets.svg',
                to: {
                  name: RouteServiceName.LONGUE_VIE_AUX_OBJETS_DETAIL,
                  params: { id: 'id5' },
                },
              },
            ],
            aside: {
              description:
                "L'ADEME vous aide à trouver des alternatives à l'achat et à prolonger la vie de vos objets. Pour préserver les ressources de la planète.... et de votre porte-monnaie !",
              logo: '',
              nom: 'Longue Vie Aux Objets - ADEME',
              screenshot: '/service-longue-vie-aux-objets.webp',
              url: 'https://longuevieauxobjets.ademe.fr/',
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

  it("quand il n'y a pas de suggestions, renvoie aucun resultat", async () => {
    // GIVEN
    const usecase = new RecupererServiceLongueVieAuxObjetsUsecase(
      ServiceRechercheLongueVieAuxObjetsRepositoryMock.recupererServiceMock({
        titre: 'Mon service',
        suggestions: [],
        favoris: [],
        categories: [
          { code: 'code', label: 'label', estLaCategorieParDefaut: true },
          { code: 'code', label: 'label', estLaCategorieParDefaut: false },
        ],
        estEnErreur: false,
      }),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'idService',
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm =>
          expect(vm).toStrictEqual<ServiceRechercheLongueVieAuxObjetsViewModel>({
            aucunResultat: true,
            aside: {
              description:
                "L'ADEME vous aide à trouver des alternatives à l'achat et à prolonger la vie de vos objets. Pour préserver les ressources de la planète.... et de votre porte-monnaie !",
              logo: '',
              nom: 'Longue Vie Aux Objets - ADEME',
              screenshot: '/service-longue-vie-aux-objets.webp',
              url: 'https://longuevieauxobjets.ademe.fr/',
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
    const usecase = new RecupererServiceLongueVieAuxObjetsUsecase(
      new ServiceRechercheLongueVieAuxObjetsRepositoryEnErreur(),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'idService',
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm => expect(vm).toEqual(null),

        error =>
          expect(error).toEqual(
            'Le service prend plus de temps que prévu à répondre. Merci de recharger la page ou réessayer plus tard.',
          ),
      ),
    );
  });
});
