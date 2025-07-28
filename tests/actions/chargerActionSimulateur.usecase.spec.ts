import { ChargerActionStrategyFactory, ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ActionPresenterImpl, ActionViewModelBuilder } from '@/domaines/actions/adapters/action.presenter.impl';
import { ActionSimulateurViewModel } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
import { ChargerActionSimulateurUsecase } from '@/domaines/actions/chargerActionSimulateur.usecase';
import { ChargerActionBilanUsecase } from '@/domaines/actions/chargerActionBilan.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';
import { SimulateursSupportes } from '@/shell/simulateursSupportes';

describe("Fichier de tests concernant la récupération d'une action de type simulateur", () => {
  it("En donnant l'id d'une action, on devrait pouvoir récupérer son entiereté", async () => {
    const action: ActionDetail = {
      articles: [],
      commune: '',
      faq: [],
      services: [],
      thematique: ClefThematiqueAPI.alimentation,
      emoji: '🚗',
      realisee: false,
      points: 30,
      consigne: 'Consigne',
      labelCompteur: '100 simulateurs réalisés',
      type: TypeAction.SIMULATEUR,
      sources: [],
      titre: '<span aria-hidden="true">🚗</span> titre de l&#39;action',
      sousTitre:
        'Quelle voiture allez-vous adopter ? Faites le test pour découvrir la voiture qui vous correspond le mieux !',

      corps: {
        introduction: '',
        astuces: '',
      },
      aides: [
        {
          titre: 'Titre aide 1',
          id: 'id-aide-1',
          partenaireNom: 'Partenaire',
          partenaireImg: 'partenaire_img.png',
          montantMaximum: 1200,
          estGratuit: false,
        },
        {
          titre: 'Titre aide 2',
          id: 'id-aide-2',
          partenaireNom: 'Partenaire2',
          partenaireImg: 'partenaire_img2.png',
          montantMaximum: 1200,
          estGratuit: false,
        },
        {
          titre: 'Titre aide 2',
          id: 'id-aide-2',
          partenaireNom: 'Partenaire2',
          partenaireImg: 'partenaire_img2.png',
          montantMaximum: undefined,
          estGratuit: true,
        },
      ],
      quizzFelicitations: '',
      code: 'id-action-simulateur-test',
      nombreDeRealisations: 40,
      nombreAidesDisponibles: 0,
      idEnchainementKYCs: 'id-enchainement-action-simulateur-test',
      explicationsRecommandations: new ExplicationsRecommandation(false, [
        { labelExplication: 'Vous avez une voiture', tag: 'possede-voiture' },
      ]),
    };
    const usecase = new ChargerActionUsecase(
      new ChargerActionStrategyFactory(
        new ChargerActionClassiqueUsecase(),
        new ChargerActionQuizUsecase(),
        new ChargerActionSimulateurUsecase(),
        new ChargerActionBilanUsecase(),
      ),
      ActionsRepositoryMock.avecActionDetail(action),
      new ActionPresenterImpl(
        () => {},
        () => {},
        expected,
        () => {},
      ),
    );
    await usecase.execute('id-utilisateur', 'id-action', TypeAction.SIMULATEUR);

    function expected(viewModel: ActionSimulateurViewModel): void {
      expect(viewModel).toStrictEqual<ActionSimulateurViewModel>({
        aDejaEteSimule: false,
        realisee: false,
        partenaire: undefined,
        points: 30,
        consigne: 'Consigne',
        labelCompteur: '100 simulateurs réalisés',
        nombreDeRealisations: 40,
        titre: '<span aria-hidden="true">🚗</span> <span aria-hidden="true">🚗</span> titre de l&#39;action',
        titreAffiche:
          'Simulateur - <span aria-hidden="true">🚗</span> <span aria-hidden="true">🚗</span> titre de l&#39;action',
        titrePropre: 'span aria-hidden"true"span titre de l39;action',
        sousTitre:
          'Quelle voiture allez-vous adopter ? Faites le test pour découvrir la voiture qui vous correspond le mieux !',
        introduction: '',
        articlesRecommandes: [],
        aides: [
          {
            titre: 'Titre aide 1',
            id: 'id-aide-1',
            partenaireNom: 'Partenaire',
            partenaireImg: 'partenaire_img.png',
            titreUrl: 'titre-aide-1',
            montantMaximum: '1 200 €',
            estGratuit: false,
          },
          {
            titre: 'Titre aide 2',
            id: 'id-aide-2',
            partenaireNom: 'Partenaire2',
            partenaireImg: 'partenaire_img2.png',
            titreUrl: 'titre-aide-2',
            montantMaximum: '1 200 €',
            estGratuit: false,
          },
          {
            titre: 'Titre aide 2',
            id: 'id-aide-2',
            partenaireNom: 'Partenaire2',
            partenaireImg: 'partenaire_img2.png',
            titreUrl: 'titre-aide-2',
            montantMaximum: undefined,
            estGratuit: true,
          },
        ],
        actionId: 'id-action-simulateur-test',
        idEnchainementKYCs: 'id-enchainement-action-simulateur-test',
        sources: [],
        explicationsRecommandation: {
          titre: '<span class="text--bold">Recommandée</span> pour vous car',
          justifications: ['Vous avez une voiture'],
        },
      });
    }
  });

  it('devrait inclure les informations du partenaire MAIF', async () => {
    // Given
    const actionMinimale: ActionDetail = {
      corps: { astuces: '', introduction: '' },
      commune: '',
      explicationsRecommandations: new ExplicationsRecommandation(false, []),
      idEnchainementKYCs: '',
      nombreAidesDisponibles: 0,
      thematique: ClefThematiqueAPI.alimentation,
      type: TypeAction.SIMULATEUR,
      code: SimulateursSupportes.MAIF,
      titre: 'Titre simulateur',
      sousTitre: 'Sous-titre',
      emoji: '',
      realisee: false,
      nombreDeRealisations: 0,
      points: 10,
      consigne: '',
      labelCompteur: '',
      sources: [],
      articles: [],
      aides: [],
      services: [],
      faq: [],
    };

    // When
    const resultat = await ActionViewModelBuilder.buildSimulateur(actionMinimale);

    // Then
    expect(resultat.partenaire).toEqual({
      nom: 'Aux Alentours par MAIF',
      url: 'https://auxalentours.maif.fr/',
      logo: '/maif-aux-alentours.webp',
    });
  });

  it('devrait inclure les informations du partenaire WattWatchers', async () => {
    // Given
    const actionMinimale: ActionDetail = {
      corps: { astuces: '', introduction: '' },
      commune: '',
      explicationsRecommandations: new ExplicationsRecommandation(false, []),
      idEnchainementKYCs: '',
      nombreAidesDisponibles: 0,
      thematique: ClefThematiqueAPI.alimentation,
      type: TypeAction.SIMULATEUR,
      code: SimulateursSupportes.WINTER,
      titre: 'Titre simulateur',
      sousTitre: 'Sous-titre',
      emoji: '',
      realisee: false,
      nombreDeRealisations: 0,
      points: 10,
      consigne: '',
      labelCompteur: '',
      sources: [],
      articles: [],
      aides: [],
      services: [],
      faq: [],
    };

    // When
    const resultat = await ActionViewModelBuilder.buildSimulateur(actionMinimale);

    // Then
    expect(resultat.partenaire).toEqual({
      nom: 'Watt Watchers',
      url: 'https://www.wattwatchers.fr/',
      logo: '/watt-watchers-partenaire.webp',
    });
  });
});
