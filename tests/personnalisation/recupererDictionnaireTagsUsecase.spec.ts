import { AfficherDictionnaireTagsPresenterImpl } from '@/domaines/personnalisation/adapters/afficherDictionnaireTags.presenter.impl';
import { DictionnaireTagsViewModel } from '@/domaines/personnalisation/ports/afficherDictionnaireTagsPresenter';
import {
  DefinitionTag,
  PersonnalisationRepository,
  PreviewActionsParThematique,
} from '@/domaines/personnalisation/ports/personnalisation.repository';
import { RecupererDictionnaireTagsUsecase } from '@/domaines/personnalisation/recupererDictionnaireTags.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { RouteActionsName } from '@/router/actions/routes';

class PersonnalisationRepositoryMock implements PersonnalisationRepository {
  async recupererDictionnaireTags(): Promise<DefinitionTag[]> {
    return [
      {
        code: 'test_tag',
        labelRecommandation: 'Tag de test',
        descriptionInterne: 'Description du tag de test',
        nombreUserAvecTag: 150,
        pourcentageUserAvecTag: 25,
        type: 'user_kyc',
        kycCreationTag: [
          {
            idCms: '123',
            code: 'kyc_test',
            question: 'Question test ?',
          },
        ],
        actionsIncluantes: [
          {
            idCms: '456',
            code: 'action_test',
            type: 'simulateur',
            titre: 'Action test',
            thematique: ClefThematiqueAPI.alimentation,
          },
        ],
        actionsExcluantes: [],
        warnings: {
          estCmsDeclarationManquante: true,
          estBackendDeclarationManquante: true,
          estActivationFonctionnelleAbsente: true,
        },
      },
      {
        code: 'test_tag',
        labelRecommandation: 'Tag de test',
        descriptionInterne: 'Description du tag de test',
        nombreUserAvecTag: 150,
        pourcentageUserAvecTag: 25,
        type: 'user_kyc',
        kycCreationTag: [
          {
            idCms: '123',
            code: 'kyc_test',
            question: 'Question test ?',
          },
        ],
        actionsIncluantes: [],
        actionsExcluantes: [
          {
            idCms: '456',
            code: 'action_test',
            type: 'simulateur',
            titre: 'Action test',
            thematique: ClefThematiqueAPI.alimentation,
          },
        ],
        warnings: {
          estCmsDeclarationManquante: false,
          estBackendDeclarationManquante: false,
          estActivationFonctionnelleAbsente: true,
        },
      },
    ];
  }

  recupererActionsAvecTags(tags: string[]): Promise<PreviewActionsParThematique> {
    throw new Error('Not implemented');
  }

  recupererTagsPersonnalisation(): Promise<string[]> {
    throw new Error('Not implemented');
  }
}

describe('Fichier de test pour la personnalisation - récupérer le dictionnaire des tags', () => {
  it('Devrait afficher correctement le dictionnaire des tags', async () => {
    // GIVEN
    const usecase = new RecupererDictionnaireTagsUsecase(
      new PersonnalisationRepositoryMock(),
      new AfficherDictionnaireTagsPresenterImpl(vm => {
        // THEN
        expect(vm).toStrictEqual<DictionnaireTagsViewModel>({
          definitionTags: [
            {
              code: 'test_tag',
              labelRecommandation: 'Tag de test',
              descriptionInterne: 'Description du tag de test',
              indicationUser:
                '<span class="text--bold">150</span> usagers concernés (<span class="text--bold">25 %</span>)',
              type: { titre: 'UTILISATEUR (KYC)', classColor: 'fr-badge--yellow-tournesol' },
              kycCreationTag: [
                {
                  idCms: '123',
                  code: 'kyc_test',
                  question: 'Question test ?',
                },
              ],
              actionsIncluantes: [
                {
                  routerLinkTo: {
                    name: RouteActionsName.ACTION_INDIVIDUELLE,
                    params: {
                      titre: 'action-test',
                      type: 'simulateur',
                      id: 'action_test',
                    },
                  },
                  titre: 'Action test',
                },
              ],
              actionsExcluantes: [],
              warnings: [
                'Tag inconnu du CMS',
                'Tag inconnu du back-end',
                'Aucune KYC / traitement pour affecter ce tag',
              ],
            },
            {
              code: 'test_tag',
              labelRecommandation: 'Tag de test',
              descriptionInterne: 'Description du tag de test',
              indicationUser:
                '<span class="text--bold">150</span> usagers concernés (<span class="text--bold">25 %</span>)',
              type: { titre: 'UTILISATEUR (KYC)', classColor: 'fr-badge--yellow-tournesol' },
              kycCreationTag: [
                {
                  idCms: '123',
                  code: 'kyc_test',
                  question: 'Question test ?',
                },
              ],
              actionsIncluantes: [],
              actionsExcluantes: [
                {
                  routerLinkTo: {
                    name: RouteActionsName.ACTION_INDIVIDUELLE,
                    params: {
                      titre: 'action-test',
                      type: 'simulateur',
                      id: 'action_test',
                    },
                  },
                  titre: 'Action test',
                },
              ],
              warnings: ['Aucune KYC / traitement pour affecter ce tag'],
            },
          ],
        });
      }),
    );

    // WHEN
    await usecase.execute();
  });
});
