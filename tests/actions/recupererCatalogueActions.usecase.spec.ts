import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
import { Action } from '@/domaines/actions/ports/actions.repository';
import {
  CatalogueActionsPresenterImpl,
  CatalogueActionsViewModel,
} from '@/domaines/actions/adapters/catalogueActions.presenter.impl';

describe("Fichier de tests concernant la récupération du catalogue d'actions", () => {
  it('Doit presenter le catalogue actions', () => {
    // GIVEN
    const action: Action = {
      code: 'code-action-test',
      titre: 'Tester une nouvelle **recette végétarienne**',
      sousTitre:
        'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
      corps: {
        introduction:
          '## En **quelques mots**\n\n- Les repas à base de légumes sont en moyenne **30% moins chers** que ceux à base de viande.\n- Les nutriments contenus dans les légumes de saison sont une grande aide pour passer l’hiver !',
        astuces:
          '## Nos **astuces**\n\n- **Revisitez vos classiques** : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.',
      },
      nombreDePersonnes: 0,
      nombreAideDispobible: 0,
      recommandations: [],
    };
    // WHEN
    const usecase = new RecupererCatalogueActionsUsecase(new ActionsRepositoryMock(action));
    usecase.execute(new CatalogueActionsPresenterImpl(expected));

    // THEN
    function expected(viewModel: CatalogueActionsViewModel): void {
      expect(viewModel).toEqual({
        actions: [
          {
            code: 'code-action-test',
            titre: 'Tester une nouvelle **recette végétarienne**',
            nombreDePersonnes: '<span class="text--bold">0</span> défis réalisés',
            aidesDisponibles: undefined,
            url: {
              name: 'action-individuelle',
              params: {
                id: 0,
                titre: 'code-action-test',
              },
            },
          },
        ],
      });
    }
  });
});
