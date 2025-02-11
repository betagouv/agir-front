import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
import { Action } from '@/domaines/actions/ports/actions.repository';

describe("Fichier de tests concernant la récupération du catalogue d'actions", () => {
  it('Doit presenter le catalogue actions', () => {
    // GIVEN
    const actions: Action[] = [
      {
        code: 'code-action-test',
        titre: 'Tester une nouvelle **recette végétarienne**',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        nombreDePersonnes: 0,
        nombreAidesDisponibles: 0,
      },
    ];

    // WHEN
    const usecase = new RecupererCatalogueActionsUsecase(ActionsRepositoryMock.avecActions(actions));
    usecase.execute('id-utilisateur', new CatalogueActionsPresenterImpl(expected));

    // THEN
    function expected(viewModel: CatalogueActionsViewModel): void {
      expect(viewModel).toEqual({
        actions: [
          {
            code: 'code-action-test',
            titre: 'Tester une nouvelle <span class="text--bold">recette végétarienne</span>',
            nombreDePersonnes: '<span class="text--bold">0</span> défis réalisés',
            aidesDisponibles: undefined,
            url: {
              name: 'action-individuelle',
              params: {
                id: 'code-action-test',
                titre: 'tester-une-nouvelle-recette-vegetarienne',
              },
            },
          },
        ],
      });
    }
  });
});
