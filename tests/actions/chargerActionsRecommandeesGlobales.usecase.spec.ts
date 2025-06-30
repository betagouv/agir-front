import { Action, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ChargerActionsRecommandeesGlobalesUsecase } from '@/domaines/actions/chargerActionsRecommandeesGlobales.usecase';
import { ActionsPresenterImpl } from '@/domaines/actions/adapters/actions.presenter.impl';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';

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
      },
    ];

    const usecase = new ChargerActionsRecommandeesGlobalesUsecase(ActionsRepositoryMock.avecActions(actions));
    // WHEN
    await usecase.execute(
      'id-utilisateur',
      new ActionsPresenterImpl(actionsViewModel => {
        expect(actionsViewModel).toStrictEqual<ActionViewModel[]>([
          {
            aidesDisponibles: undefined,
            code: 'code-action-test',
            dejaVue: false,
            nombreDePersonnes: undefined,
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
            aidesDisponibles: '<span class="text--bold">5</span> aides disponibles',
            code: 'code-action-test2',
            dejaVue: true,
            nombreDePersonnes: '<span class="text--bold">4</span> actions réalisées',
            titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span> 2',
            url: {
              name: 'action-individuelle',
              params: {
                id: 'code-action-test2',
                titre: 'tester-une-nouvelle-recette-vegetarienne-2',
                type: 'bilan',
              },
            },
          },
        ]);
      }),
    );
  });
});
