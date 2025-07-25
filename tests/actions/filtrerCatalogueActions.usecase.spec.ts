import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
import { Action, CatalogueActions, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { FiltrerCatalogueActionsUsecase } from '@/domaines/actions/filtrerCatalogueActions.usecase';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';

describe("Fichier de tests concernant la récupération du catalogue d'actions", () => {
  it('Doit filtrer correctement le catalogue actions et les actions', async () => {
    // GIVEN
    const actions: Action[] = [
      {
        code: 'code-action-test2',
        titre: 'Tester une nouvelle **recette végétarienne** 2',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 4,
        nombreAidesDisponibles: 5,
        type: TypeAction.BILAN,
        dejaVue: true,
        dejaFaite: false,
        explicationsRecommandations: new ExplicationsRecommandation(false, []),
        labelCompteur: '0 action réalisée',
        montantMaxEconomiesEnEuros: 0,
      },
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
          selected: true,
        },
      ],
      consultation: 'tout',
    };

    // WHEN
    const usecase = new FiltrerCatalogueActionsUsecase(ActionsRepositoryMock.avecCatalogue(catalogue));
    await usecase.execute(
      'id-utilisateur',
      [ClefThematiqueAPI.alimentation],
      '2',
      true,
      false,
      new CatalogueActionsPresenterImpl(expectedFiltres, expectedActions),
    );

    // THEN
    function expectedActions(viewModel: ActionViewModel[]): void {
      expect(viewModel).toStrictEqual<ActionViewModel[]>([
        {
          code: 'code-action-test2',
          titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span> 2',
          url: {
            name: 'action-individuelle',
            params: {
              id: 'code-action-test2',
              titre: 'tester-une-nouvelle-recette-vegetarienne-2',
              type: 'bilan',
            },
          },
          badges: [
            {
              text: '<span aria-hidden="true">💰</span> <span class="text--bold">5</span> aides',
              color: 'background--vert-badge text--white',
            },
            {
              color: 'background-bleu-light text--bleu',
              text: 'BILAN',
            },
          ],
          label: undefined,
          nombreDeParticipants: '0 action réalisée',
          aidesDisponibles: '<span class="text--bold">5</span> aides',
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
            checked: true,
          },
        ],
        phraseNombreActions: '1 action',
      });
    }
  });
});
