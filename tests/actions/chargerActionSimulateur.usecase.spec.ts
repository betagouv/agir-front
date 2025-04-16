import { ChargerActionStrategyFactory, ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
import { ActionSimulateurViewModel } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
import { ChargerActionSimulateurUsecase } from '@/domaines/actions/chargerActionSimulateur.usecase';
import { ReponseKYCSimple, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestion.usecase';
import { ChargerActionBilanUsecase } from '@/domaines/actions/chargerActionBilan.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe("Fichier de tests concernant la récupération d'une action de type simulateur", () => {
  it("En donnant l'id d'une action, on devrait pouvoir récupérer son entiereté", async () => {
    const action: ActionDetail = {
      thematique: ClefThematiqueAPI.alimentation,
      realisee: false,
      points: 30,
      consigne: 'Consigne',
      labelCompteur: '100 simulateurs réalisés',
      kycs: [
        {
          id: 'questionId',
          libelle: 'Une question',
          type: 'libre',
          points: 10,
          thematique: ThematiqueQuestion.ALIMENTATION,
          reponses: {
            reponses_possibles: [],
            reponse: [],
          } as ReponseKYCSimple,
          aEteRepondu: false,
        },
        {
          id: 'questionId2',
          libelle: 'Une question 2 ?',
          type: 'decimal',
          points: 20,
          thematique: ThematiqueQuestion.TRANSPORT,
          reponses: {
            reponses_possibles: [],
            reponse: [],
          } as ReponseKYCSimple,
          aEteRepondu: false,
        },
      ],
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
      type: TypeAction.SIMULATEUR,
      titre: '**Simulateur voiture**',
      quizzes: [],
      sousTitre:
        'Quelle voiture allez-vous adopter ? Faites le test pour découvrir la voiture qui vous correspond le mieux !',
      commune: 'Noisiel',
      corps: {
        introduction:
          '## En **quelques mots**\n\n-, Pourquoi est-ce important de bien choisir sa voiture ?\n-, Comment choisir une voiture qui correspond à vos besoins ?\n-, Quels sont les critères à prendre en compte pour choisir une voiture ?',
        astuces: '',
      },
      articles: [
        {
          titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
          image: '/temp_les_bases_alim_vege.png',
          id: '1',
        },
        {
          titre: 'Comment répondre à ses besoins nutritionnels sans viande ?',
          image: '/temp_comment_repondre_besoins_nutri.png',
          id: '2',
        },
        {
          titre: '10 recettes végétariennes pour les fêtes',
          image: '/temp_10_recettes_pour_fetes.png',
          id: '3',
        },
      ],
      services: [],
      faq: [],
      sources: [],
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
        realisee: false,
        points: 30,
        consigne: 'Consigne',
        labelCompteur: '100 simulateurs réalisés',
        nombreDeRealisations: 40,
        titre: '<span class="text--bold">Simulateur voiture</span>',
        titreAffiche: 'Simulateur - <span class="text--bold">Simulateur voiture</span>',
        titrePropre: 'Simulateur voiture',
        sousTitre:
          'Quelle voiture allez-vous adopter ? Faites le test pour découvrir la voiture qui vous correspond le mieux !',
        introduction: `<h2>En <span class="text--bold">quelques mots</span></h2><p>-, Pourquoi est-ce important de bien choisir sa voiture ?
-, Comment choisir une voiture qui correspond à vos besoins ?
-, Quels sont les critères à prendre en compte pour choisir une voiture ?</p>
`,
        articlesRecommandes: [
          {
            image: '/temp_les_bases_alim_vege.png',
            titre: 'Les bases de l’alimentation végétarienne : par où commencer ?',
            url: '/article/les-bases-de-l-alimentation-vegetarienne-par-ou-commencer-/1',
          },
          {
            image: '/temp_comment_repondre_besoins_nutri.png',
            titre: 'Comment répondre à ses besoins nutritionnels sans viande ?',
            url: '/article/comment-repondre-a-ses-besoins-nutritionnels-sans-viande-/2',
          },
          {
            image: '/temp_10_recettes_pour_fetes.png',
            titre: '10 recettes végétariennes pour les fêtes',
            url: '/article/10-recettes-vegetariennes-pour-les-fetes/3',
          },
        ],
        aides: [
          {
            titre: 'Titre aide 1',
            id: 'id-aide-1',
            partenaireNom: 'Partenaire',
            partenaireImg: 'partenaire_img.png',
            titreUrl: 'titre-aide-1',
            montantMaximum: '1200€',
            estGratuit: false,
          },
          {
            titre: 'Titre aide 2',
            id: 'id-aide-2',
            partenaireNom: 'Partenaire2',
            partenaireImg: 'partenaire_img2.png',
            titreUrl: 'titre-aide-2',
            montantMaximum: '1200€',
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
        kycs: [
          {
            id: 'questionId',
            libelle: 'Une question',
            type: 'libre',
            points: 'Récoltez vos + 10 points',
            reponses_possibles: [],
            aDejaEteRepondu: false,
            description:
              "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux comprendre vos habitudes alimentaires",
          },
          {
            id: 'questionId2',
            libelle: 'Une question 2 ?',
            type: 'decimal',
            points: 'Récoltez vos + 20 points',
            reponses_possibles: [],
            aDejaEteRepondu: false,
            description:
              "Ces informations permettent à <span class='text--italic'>J'agis</span> de mieux vous conseiller en matière de mobilité",
          },
        ],
        actionId: 'id-action-simulateur-test',
        sources: [],
      });
    }
  });
});
