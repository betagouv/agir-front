import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
import { Action, CatalogueActions, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { FiltrerCatalogueActionsUsecase } from '@/domaines/actions/filtrerCatalogueActions.usecase';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';
import { Filtres, FiltreStatut, FiltreStatutBuilder } from '@/domaines/actions/filtres';

describe("Fichier de tests concernant la récupération du catalogue d'actions", () => {
  it('Doit filtrer correctement le catalogue actions et les actions quand un utilisateur est connecté', async () => {
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

    const actionsRepository = ActionsRepositoryMock.avecCatalogue(catalogue);
    const usecase = new FiltrerCatalogueActionsUsecase(actionsRepository);

    const statut: FiltreStatut = {
      dejaVu: true,
      dejaRealisees: false,
      recommandePourMoi: false,
    };

    // WHEN
    await usecase.execute(
      'id-utilisateur',
      [ClefThematiqueAPI.alimentation],
      '2',
      statut,
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
            label: '<span class="fr-pr-1v" aria-hidden="true">🚅</span> Me déplacer',
            checked: false,
          },
          {
            id: ClefThematiqueAPI.alimentation,
            label: '<span class="fr-pr-1v" aria-hidden="true">🍛</span> Me nourrir',
            checked: true,
          },
        ],
        phraseNombreActions: '1 action',
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
    const spy = vi.spyOn(actionsRepository, 'filtrerCatalogueActions');
    const usecase = new FiltrerCatalogueActionsUsecase(actionsRepository);

    await usecase.execute(
      '',
      [],
      '',
      FiltreStatutBuilder.defaut(),
      new CatalogueActionsPresenterImpl(
        () => {},
        () => {},
      ),
    );

    expect(spy).toHaveBeenCalledWith(Filtres.pourUtilisateurNonConnecte([], ''));
  });

  it('doit transmettre les paramètres au repository', async () => {
    const catalogue: CatalogueActions = {
      actions: [],
      filtres: [],
      consultation: 'tout',
    };
    const actionsRepository = ActionsRepositoryMock.avecCatalogue(catalogue);
    const spy = vi.spyOn(actionsRepository, 'filtrerCatalogueActions');
    const usecase = new FiltrerCatalogueActionsUsecase(actionsRepository);

    const statut: FiltreStatut = {
      dejaVu: false,
      dejaRealisees: false,
      recommandePourMoi: false,
    };

    await usecase.execute(
      'user1',
      ['transport'],
      'titre',
      statut,
      new CatalogueActionsPresenterImpl(
        () => {},
        () => {},
      ),
    );

    expect(spy).toHaveBeenCalledWith(Filtres.pourUtilisateurConnecte('user1', ['transport'], 'titre', statut));
  });
});
