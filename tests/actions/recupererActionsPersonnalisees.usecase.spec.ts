import { RecupererActionsPersonnaliseesUsecase } from '@/domaines/actions/recupererActionsPersonnalisees.usecase';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ActionsDansUneThematiquePresenterImpl } from '@/domaines/actions/adapters/actionsDansUneThematique.presenter.impl';
import { expect } from 'vitest';
import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';

describe('Fichier de test concernant la récupération des actions personnalisées', () => {
  it("Quand la personnalisation n'est pas faite doit presenter le fait de personnaliser avec le bon enchainement de kycs", async () => {
    // GIVEN
    const usecase = new RecupererActionsPersonnaliseesUsecase(
      ActionsRepositoryMock.avecActionsRecommandeesDansUneThematique({
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
    );
  });

  it('Quand la personnalisation est faite doit presenter les actions', async () => {
    // GIVEN
    const usecase = new RecupererActionsPersonnaliseesUsecase(
      ActionsRepositoryMock.avecActionsRecommandeesDansUneThematique({
        doitRepondreAuxKYCs: false,
        idEnchainementKYCs: 'idEnchainementKYCs',
        actions: [
          {
            code: 'code-action-test',
            titre: 'Tester une nouvelle **recette végétarienne**',
            sousTitre:
              'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
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
          expect(actions).toStrictEqual<CatalogueActionsViewModel>({
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
                    type: TypeAction.CLASSIQUE,
                  },
                },
              },
            ],
          });
        },
        idEnchainementKYCs => {
          expect(idEnchainementKYCs).toStrictEqual('');
        },
      ),
    );

    // THEN
  });
});
