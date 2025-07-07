import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
import { Action, CatalogueActions, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe("Fichier de tests concernant la récupération du catalogue d'actions", () => {
  it('Doit presenter le catalogue actions et les actions', async () => {
    // GIVEN
    const actions: Action[] = [
      {
        emoji: '🍽',
        code: 'code-action-test',
        titre: 'Tester une nouvelle **recette végétarienne**',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 0,
        nombreAidesDisponibles: 0,
        type: TypeAction.CLASSIQUE,
        dejaVue: false,
      },
      {
        code: 'code-action-test2',
        emoji: '🍽',
        titre: 'Tester une nouvelle **recette végétarienne** 2',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 4,
        nombreAidesDisponibles: 5,
        type: TypeAction.BILAN,
        dejaVue: true,
      },
      {
        code: 'code-action-test3',
        titre: 'Tester une nouvelle **recette végétarienne** 3',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 1,
        nombreAidesDisponibles: 1,
        type: TypeAction.BILAN,
        dejaVue: true,
      },
      //   TODO: mettre différent type d'actions
    ];

    const catalogue: CatalogueActions = {
      actions,
      filtres: [
        {
          code: ClefThematiqueAPI.transports,
          label: 'Transport !',
          selected: false,
        },
        {
          code: ClefThematiqueAPI.alimentation,
          label: 'Alimentation !',
          selected: false,
        },
      ],
      consultation: 'tout',
    };

    // WHEN
    const usecase = new RecupererCatalogueActionsUsecase(ActionsRepositoryMock.avecCatalogue(catalogue));
    await usecase.execute('id-utilisateur', new CatalogueActionsPresenterImpl(expectedFiltres, expectedActions));

    // THEN
    function expectedActions(viewModel: ActionViewModel[]): void {
      expect(viewModel).toStrictEqual<ActionViewModel[]>([
        {
          code: 'code-action-test',
          titre:
            '<span aria-hidden="true">🍽</span> Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
          nombreDePersonnes: undefined,
          dejaVue: false,
          aidesDisponibles: undefined,
          url: {
            name: 'action-individuelle',
            params: {
              id: 'code-action-test',
              titre: 'tester-une-nouvelle-recette-vegetarienne',
              type: 'classique',
            },
          },
        },
        {
          code: 'code-action-test2',
          titre:
            '<span aria-hidden="true">🍽</span> Tester une nouvelle <span class="text--bold">recette végétarienne</span> 2',
          nombreDePersonnes: '<span class="text--bold">4</span> actions réalisées',
          aidesDisponibles: '<span class="text--bold">5</span> aides disponibles',
          dejaVue: true,
          url: {
            name: 'action-individuelle',
            params: {
              id: 'code-action-test2',
              titre: 'tester-une-nouvelle-recette-vegetarienne-2',
              type: 'bilan',
            },
          },
        },
        {
          code: 'code-action-test3',
          titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span> 3',
          nombreDePersonnes: '<span class="text--bold">1</span> action réalisée',
          aidesDisponibles: '<span class="text--bold">1</span> aide disponible',
          dejaVue: true,
          url: {
            name: 'action-individuelle',
            params: {
              id: 'code-action-test3',
              titre: 'tester-une-nouvelle-recette-vegetarienne-3',
              type: 'bilan',
            },
          },
        },
      ]);
    }

    function expectedFiltres(viewModel: FiltresCatalogueActionsViewModel): void {
      expect(viewModel).toStrictEqual<FiltresCatalogueActionsViewModel>({
        filtres: [
          {
            id: ClefThematiqueAPI.transports,
            label: 'Transport !',
            checked: false,
          },
          {
            id: ClefThematiqueAPI.alimentation,
            label: 'Alimentation !',
            checked: false,
          },
        ],
        phraseNombreActions: '3 actions',
      });
    }
  });

  it('Devrait appeler le repository même sans id utilisateur', async () => {
    const catalogue: CatalogueActions = {
      actions: [],
      filtres: [],
      consultation: 'tout',
    };

    const actionsRepository = ActionsRepositoryMock.avecCatalogue(catalogue);
    const spy = vi.spyOn(actionsRepository, 'chargerCatalogueActions');

    const usecase = new RecupererCatalogueActionsUsecase(actionsRepository);
    await usecase.execute(
      '',
      new CatalogueActionsPresenterImpl(
        () => {},
        () => {},
      ),
    );

    expect(spy).toHaveBeenCalled();
  });
});
