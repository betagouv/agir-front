import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
import { Action, CatalogueActions, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';
import { TagThematique } from '@/domaines/thematiques/TagThematique';
import { ListeActions } from '@/domaines/actions/model/ListeActions';

describe("Fichier de tests concernant la récupération du catalogue d'actions", () => {
  it('Doit presenter le catalogue actions et les actions triées par actions recommandées', async () => {
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
        explicationsRecommandations: new ExplicationsRecommandation(true, [
          { tag: 'economies', labelExplication: 'veut faire des économies' },
        ]),
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
        explicationsRecommandations: new ExplicationsRecommandation(true, [
          { tag: 'economies', labelExplication: 'veut faire des économies' },
          { tag: 'environnement', labelExplication: "sensible à l'environnement" },
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
        explicationsRecommandations: new ExplicationsRecommandation(true, [
          { tag: 'economies', labelExplication: 'veut faire des économies' },
        ]),
        labelCompteur: '0 action réalisée',
        montantMaxEconomiesEnEuros: 0,
        thematique: ClefThematiqueAPI.alimentation,
      },
    ];

    const catalogue: CatalogueActions = {
      actions: new ListeActions(actions),
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
          aidesDisponibles: undefined,
          badges: [
            {
              color: 'prix-highlight',
              text: '<span aria-hidden=\"true\">💶</span> 10 € d\'économies',
            },
          ],
          code: 'code-action-test',
          label: undefined,
          nombreDeParticipants: undefined,
          thematiqueTag: {
            label: 'Me nourrir',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoji: '🍛',
            },
          },
          titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
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
          aidesDisponibles: '<span class="text--bold">5</span> aides',
          badges: [
            {
              color: 'background--vert-badge text--white',
              text: '<span aria-hidden="true">💰</span> <span class="text--bold">5</span> aides',
            },
            {
              color: 'background-bleu-light text--bleu',
              text: 'SIMULATEUR',
            },
          ],
          code: 'code-action-test2',
          label: undefined,
          nombreDeParticipants: '4 actions personnalisées réalisées',
          thematiqueTag: {
            label: 'Me nourrir',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoji: '🍛',
            },
          },
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
        },
        {
          aidesDisponibles: '<span class="text--bold">1</span> aide',
          badges: [
            {
              color: 'background--vert-badge text--white',
              text: '<span aria-hidden="true">💰</span> <span class="text--bold">1</span> aide',
            },
            {
              color: 'background-bleu-light text--bleu',
              text: 'BILAN',
            },
            {
              color: 'prix-highlight',
              text: '<span aria-hidden=\"true\">💶</span> 25 € d\'économies',
            },
          ],
          code: 'code-action-test3',
          label: {
            color: 'fr-label--vert',
            text: 'Réalisée',
          },
          nombreDeParticipants: undefined,
          thematiqueTag: {
            label: 'Me nourrir',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoji: '🍛',
            },
          },
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
        },
        {
          aidesDisponibles: '<span class="text--bold">1</span> aide',
          badges: [
            {
              color: 'background--vert-badge text--white',
              text: '<span aria-hidden="true">💰</span> <span class="text--bold">1</span> aide',
            },
            {
              color: 'background-bleu-light text--bleu',
              text: 'QUIZ',
            },
          ],
          code: 'code-action-test4',
          label: undefined,
          nombreDeParticipants: undefined,
          thematiqueTag: {
            label: 'Me nourrir',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoji: '🍛',
            },
          },
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
      actions: new ListeActions([]),
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
