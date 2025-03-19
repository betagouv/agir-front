import { RecupererDetailThematiqueUsecase } from '@/domaines/actions/recupererDetailThematique.usecase';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ActionsDansUneThematiquePresenterImpl } from '@/domaines/actions/adapters/actionsDansUneThematique.presenter.impl';
import { expect } from 'vitest';
import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { ThematiqueResumePresenterImpl } from '@/domaines/thematiques/adapters/thematiqueResume.presenter.impl';
import { ThematiqueResumeViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';
import { RouteServiceName } from '@/router/services/routes';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteActionsName } from '@/router/actions/routes';

describe('Fichier de test concernant la récupération des actions personnalisées', () => {
  it("Quand la personnalisation n'est pas faite doit presenter le fait de personnaliser avec le bon enchainement de kycs", async () => {
    // GIVEN
    const usecase = new RecupererDetailThematiqueUsecase(
      ActionsRepositoryMock.avecActionsRecommandeesDansUneThematique({
        resume: {
          commune: 'Paris',
          thematique: ClefThematiqueAPI.consommation,
          nbSimulateurs: 0,
          nbAides: 0,
          nbRecettes: 0,
          nbActions: 0,
        },
        doitRepondreAuxKYCs: true,
        idEnchainementKYCs: 'idEnchainementKYCs',
        actions: [],
      }),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'thematiqueId',
      new ActionsDansUneThematiquePresenterImpl(
        () => {},
        idEnchainementKYCs => {
          // THEN
          expect(idEnchainementKYCs).toStrictEqual(idEnchainementKYCs);
        },
      ),
      new ThematiqueResumePresenterImpl(vm => {}),
    );
  });

  it('Quand la personnalisation est faite doit presenter les actions', async () => {
    // GIVEN
    const usecase = new RecupererDetailThematiqueUsecase(
      ActionsRepositoryMock.avecActionsRecommandeesDansUneThematique({
        resume: {
          commune: 'Paris',
          thematique: ClefThematiqueAPI.consommation,
          nbSimulateurs: 0,
          nbAides: 0,
          nbRecettes: 0,
          nbActions: 0,
        },
        doitRepondreAuxKYCs: false,
        idEnchainementKYCs: 'idEnchainementKYCs',
        actions: [
          {
            code: 'code-action-test',
            titre: 'Tester une nouvelle **recette végétarienne**',
            sousTitre:
              'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
            dejaVue: false,
            nombreDePersonnes: 0,
            nombreAidesDisponibles: 0,
            type: 'classique' as TypeAction,
          },
        ],
      }),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'thematiqueId',
      new ActionsDansUneThematiquePresenterImpl(
        actions => {
          expect(actions).toStrictEqual<ActionViewModel[]>([
            {
              code: 'code-action-test',
              titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
              nombreDePersonnes: '<span class="text--bold">0</span> défi réalisé',
              aidesDisponibles: undefined,
              dejaVue: false,
              url: {
                name: 'action-individuelle',
                params: {
                  id: 'code-action-test',
                  titre: 'tester-une-nouvelle-recette-vegetarienne',
                  type: TypeAction.CLASSIQUE,
                },
              },
            },
          ]);
        },
        idEnchainementKYCs => {
          expect(idEnchainementKYCs).toStrictEqual('');
        },
      ),
      new ThematiqueResumePresenterImpl(vm => {}),
    );
  });

  describe('Quand la personnalisation est faite doit presenter les résumés de chaque thématique', () => {
    it('Thématique alimentation', async () => {
      // GIVEN
      const usecase = new RecupererDetailThematiqueUsecase(
        ActionsRepositoryMock.avecActionsRecommandeesDansUneThematique({
          resume: {
            commune: 'Paris',
            thematique: ClefThematiqueAPI.alimentation,
            nbSimulateurs: 0,
            nbAides: 50,
            nbRecettes: 0,
            nbActions: 30,
          },
          doitRepondreAuxKYCs: false,
          idEnchainementKYCs: 'idEnchainementKYCs',
          actions: [],
        }),
      );

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        'thematiqueId',
        new ActionsDansUneThematiquePresenterImpl(
          actions => {},
          idEnchainementKYCs => {},
        ),
        new ThematiqueResumePresenterImpl(vm => {
          expect(vm).toStrictEqual<ThematiqueResumeViewModel>({
            commune: 'Paris',
            listeRaccourcis: [
              {
                to: {
                  name: RouteAidesName.AIDES,
                },
                label: `50 aides sur votre territoire`,
              },
              {
                to: {
                  name: RouteServiceName.RECETTES,
                  params: {
                    thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
                  },
                },
                label: `1150 recettes délicieuses, saines et de saison`,
              },
              {
                to: {
                  name: RouteServiceName.FRUITS_ET_LEGUMES,
                  params: {
                    thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
                  },
                },
                label: `1 calendrier de fruits et légumes de saison`,
              },
              {
                to: {
                  name: RouteServiceName.PROXIMITE,
                  params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
                },
                label: `Des adresses pour manger local`,
              },
            ],
          });
        }),
      );
    });
    it('Thématique logement', async () => {
      const usecase = new RecupererDetailThematiqueUsecase(
        ActionsRepositoryMock.avecActionsRecommandeesDansUneThematique({
          resume: {
            commune: 'Paris',
            thematique: ClefThematiqueAPI.logement,
            nbSimulateurs: 0,
            nbAides: 50,
            nbRecettes: 0,
            nbActions: 30,
          },
          doitRepondreAuxKYCs: false,
          idEnchainementKYCs: 'idEnchainementKYCs',
          actions: [],
        }),
      );

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        'thematiqueId',
        new ActionsDansUneThematiquePresenterImpl(
          actions => {},
          idEnchainementKYCs => {},
        ),
        new ThematiqueResumePresenterImpl(vm => {
          expect(vm).toStrictEqual<ThematiqueResumeViewModel>({
            commune: 'Paris',
            listeRaccourcis: [
              {
                to: {
                  name: RouteAidesName.AIDES,
                },
                label: `50 aides sur votre territoire`,
              },
              {
                href: 'https://mesaidesreno.beta.gouv.fr/',
                label: `1 simulateur Mes aides Rénovation`,
              },
            ],
          });
        }),
      );
    });
    it('Thématique transports', async () => {
      const usecase = new RecupererDetailThematiqueUsecase(
        ActionsRepositoryMock.avecActionsRecommandeesDansUneThematique({
          resume: {
            commune: 'Paris',
            thematique: ClefThematiqueAPI.transports,
            nbSimulateurs: 0,
            nbAides: 0,
            nbRecettes: 0,
            nbActions: 30,
          },
          doitRepondreAuxKYCs: false,
          idEnchainementKYCs: 'idEnchainementKYCs',
          actions: [],
        }),
      );

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        'thematiqueId',
        new ActionsDansUneThematiquePresenterImpl(
          actions => {},
          idEnchainementKYCs => {},
        ),
        new ThematiqueResumePresenterImpl(vm => {
          expect(vm).toStrictEqual<ThematiqueResumeViewModel>({
            commune: 'Paris',
            listeRaccourcis: [
              {
                to: {
                  name: RouteActionsName.ACTION_INDIVIDUELLE,
                  params: {
                    id: 'action_simulateur_voiture',
                    titre: 'trouver-le-type-de-voiture-qui-vous-convient-le-mieux',
                    type: TypeAction.SIMULATEUR,
                  },
                },
                label: `1 simulateur Dois-je changer de voiture ?`,
              },
              {
                to: {
                  name: RouteAidesName.VELO,
                },
                label: `1 simulateur aides vélo`,
              },
            ],
          });
        }),
      );
    });
    it('Thématique consommation', async () => {
      // GIVEN
      const usecase = new RecupererDetailThematiqueUsecase(
        ActionsRepositoryMock.avecActionsRecommandeesDansUneThematique({
          resume: {
            commune: 'Paris',
            thematique: ClefThematiqueAPI.consommation,
            nbSimulateurs: 0,
            nbAides: 1,
            nbRecettes: 0,
            nbActions: 30,
          },
          doitRepondreAuxKYCs: false,
          idEnchainementKYCs: 'idEnchainementKYCs',
          actions: [],
        }),
      );

      // WHEN
      await usecase.execute(
        'idUtilisateur',
        'thematiqueId',
        new ActionsDansUneThematiquePresenterImpl(
          actions => {},
          idEnchainementKYCs => {},
        ),
        new ThematiqueResumePresenterImpl(vm => {
          expect(vm).toStrictEqual<ThematiqueResumeViewModel>({
            commune: 'Paris',
            listeRaccourcis: [
              {
                to: {
                  name: RouteAidesName.AIDES,
                },
                label: `1 aide sur votre territoire`,
              },
              {
                to: {
                  name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
                  params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
                },
                label: `Des adresses de réparateur près de chez moi`,
              },
            ],
          });
        }),
      );
    });
  });
});
