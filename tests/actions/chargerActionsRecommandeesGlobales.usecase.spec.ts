import { Action, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ChargerActionsRecommandeesGlobalesUsecase } from '@/domaines/actions/chargerActionsRecommandeesGlobales.usecase';
import { ActionsPresenterImpl } from '@/domaines/actions/adapters/actions.presenter.impl';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';

describe('Fichier de tests concernant la récupération des actions recommandées inter-thématiques', () => {
  it('Doit presenter les actions sous forme de tableau', async () => {
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
        montantMaxEconomiesEnEuros: 0,
      },
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
        labelCompteur: '**4 actions** réalisées',
        montantMaxEconomiesEnEuros: 300,
      },
    ];

    const usecase = new ChargerActionsRecommandeesGlobalesUsecase(ActionsRepositoryMock.avecActions(actions));
    // WHEN
    await usecase.execute(
      'id-utilisateur',
      new ActionsPresenterImpl(actionsViewModel => {
        expect(actionsViewModel).toStrictEqual<ActionViewModel[]>([
          {
            code: 'code-action-test',
            titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
            url: {
              name: 'action-individuelle',
              params: {
                id: 'code-action-test',
                titre: 'tester-une-nouvelle-recette-vegetarienne',
                type: 'classique',
              },
            },
            badges: [],
            label: undefined,
            nombreDeParticipants: undefined,
            aidesDisponibles: undefined,
          },
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
              {
                color: 'prix-highlight',
                text: '<span aria-hidden="true">💶</span> 300 € d\'économies',
              },
            ],
            label: undefined,
            nombreDeParticipants: '<span class="text--bold">4 actions</span> réalisées',
            aidesDisponibles: '<span class="text--bold">5</span> aides',
          },
        ]);
      }),
    );
  });
});
