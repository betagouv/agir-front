import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
import { Action, CatalogueActions, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';
import { TagThematique } from '@/domaines/thematiques/TagThematique';

describe("Fichier de tests concernant la récupération du catalogue d'actions", () => {
  it('Doit presenter le catalogue actions et les actions', async () => {
    // GIVEN
    const actions: Action[] = [
      {
        code: 'code-action-test',
        titre: 'Tester une nouvelle **recette végétarienne**',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 0,
        nombreAidesDisponibles: 0,
        type: TypeAction.CLASSIQUE,
        dejaVue: false,
        dejaFaite: false,
        explicationsRecommandations: new ExplicationsRecommandation(false, []),
        labelCompteur: '0 action réalisée',
        montantMaxEconomiesEnEuros: 10,
        thematique: ClefThematiqueAPI.alimentation,
      },
      {
        code: 'code-action-test2',
        emoji: '🍽',
        titre: 'Tester une nouvelle **recette végétarienne** 2',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 4,
        nombreAidesDisponibles: 5,
        type: TypeAction.SIMULATEUR,
        dejaVue: false,
        dejaFaite: false,
        explicationsRecommandations: new ExplicationsRecommandation(false, [
          { tag: 'economies', labelExplication: 'veut faire des économies' },
        ]),
        labelCompteur: '4 actions personnalisées réalisées',
        montantMaxEconomiesEnEuros: 0,
        thematique: ClefThematiqueAPI.alimentation,
      },
      {
        code: 'code-action-test3',
        emoji: '🍽',
        titre: 'Tester une nouvelle **recette végétarienne** 3',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 1,
        nombreAidesDisponibles: 1,
        type: TypeAction.BILAN,
        dejaVue: true,
        dejaFaite: true,
        explicationsRecommandations: new ExplicationsRecommandation(false, []),
        labelCompteur: '',
        montantMaxEconomiesEnEuros: 25,
        thematique: ClefThematiqueAPI.alimentation,
      },
      {
        code: 'code-action-test4',
        emoji: '🍽',
        titre: 'Tester une nouvelle **recette végétarienne** 4',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 1,
        nombreAidesDisponibles: 1,
        type: TypeAction.QUIZZ,
        dejaVue: true,
        dejaFaite: false,
        explicationsRecommandations: new ExplicationsRecommandation(false, []),
        labelCompteur: '0 action réalisée',
        montantMaxEconomiesEnEuros: 0,
        thematique: ClefThematiqueAPI.alimentation,
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
          titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
          nombreDeParticipants: undefined,
          url: {
            name: 'action-individuelle',
            params: {
              id: 'code-action-test',
              titre: 'tester-une-nouvelle-recette-vegetarienne',
              type: 'classique',
            },
          },
          badges: [
            {
              color: 'prix-highlight',
              text: '<span aria-hidden="true">💶</span> 10 € d\'économies',
            },
          ],
          label: undefined,
          aidesDisponibles: undefined,
          thematiqueTag: {
            label: 'Me nourrir',
            style: TagThematique.getTagThematiqueUtilitaire('alimentation'),
          },
        },
        {
          code: 'code-action-test2',
          titre:
            '<span aria-hidden="true">🍽</span> Tester une nouvelle <span class="text--bold">recette végétarienne</span> 2',
          url: {
            name: 'action-individuelle',
            params: {
              id: 'code-action-test2',
              titre: 'tester-une-nouvelle-recette-vegetarienne-2',
              type: 'simulateur',
            },
          },
          badges: [
            {
              text: '<span aria-hidden="true">💰</span> <span class="text--bold">5</span> aides',
              color: 'background--vert-badge text--white',
            },
            { text: 'SIMULATEUR', color: 'background-bleu-light text--bleu' },
          ],
          label: { text: 'Recommandé', color: 'background-bleu-light text--bleu' },
          nombreDeParticipants: '4 actions personnalisées réalisées',
          aidesDisponibles: '<span class="text--bold">5</span> aides',
          thematiqueTag: {
            label: 'Me nourrir',
            style: TagThematique.getTagThematiqueUtilitaire('alimentation'),
          },
        },
        {
          code: 'code-action-test3',
          titre:
            '<span aria-hidden="true">🍽</span> Tester une nouvelle <span class="text--bold">recette végétarienne</span> 3',
          url: {
            name: 'action-individuelle',
            params: {
              id: 'code-action-test3',
              titre: 'tester-une-nouvelle-recette-vegetarienne-3',
              type: 'bilan',
            },
          },
          badges: [
            {
              text: '<span aria-hidden="true">💰</span> <span class="text--bold">1</span> aide',
              color: 'background--vert-badge text--white',
            },
            {
              color: 'background-bleu-light text--bleu',
              text: 'BILAN',
            },
            {
              color: 'prix-highlight',
              text: '<span aria-hidden="true">💶</span> 25 € d\'économies',
            },
          ],
          label: { text: 'Réalisée', color: 'fr-label--vert' },
          nombreDeParticipants: undefined,
          aidesDisponibles: '<span class="text--bold">1</span> aide',
          thematiqueTag: {
            label: 'Me nourrir',
            style: TagThematique.getTagThematiqueUtilitaire('alimentation'),
          },
        },
        {
          code: 'code-action-test4',
          titre:
            '<span aria-hidden="true">🍽</span> Tester une nouvelle <span class="text--bold">recette végétarienne</span> 4',
          url: {
            name: 'action-individuelle',
            params: {
              id: 'code-action-test4',
              titre: 'tester-une-nouvelle-recette-vegetarienne-4',
              type: 'quizz',
            },
          },
          badges: [
            {
              text: '<span aria-hidden="true">💰</span> <span class="text--bold">1</span> aide',
              color: 'background--vert-badge text--white',
            },
            { text: 'QUIZ', color: 'background-bleu-light text--bleu' },
          ],
          label: undefined,
          nombreDeParticipants: undefined,
          aidesDisponibles: '<span class="text--bold">1</span> aide',
          thematiqueTag: {
            label: 'Me nourrir',
            style: TagThematique.getTagThematiqueUtilitaire('alimentation'),
          },
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
            checked: false,
          },
        ],
        phraseNombreActions: '4 actions',
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
