import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
import { ActionQuizzesViewModel } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
import { ChargerActionStrategyFactory, ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
import { ActionsRepositoryMock } from './adapters/actions.repository.mock';
import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
import { QuizDifficulte } from '@/domaines/quiz/ports/quiz.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ChargerActionSimulateurUsecase } from '@/domaines/actions/chargerActionSimulateur.usecase';
import { ChargerActionBilanUsecase } from '@/domaines/actions/chargerActionBilan.usecase';
import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';

describe("Fichier de tests concernant la récupération d'une action de type quiz", () => {
  it("En donnant l'id d'une action, on devrait pouvoir récupérer son entiereté", async () => {
    const action: ActionDetail = {
      thematique: ClefThematiqueAPI.alimentation,
      emoji: '🍽️',
      realisee: false,
      points: 20,
      aides: [],
      consigne: 'Consigne',
      labelCompteur: '100 quizs réalisés',
      quizzFelicitations: 'Félicitations ! ',
      code: 'id-action-test',
      type: TypeAction.QUIZZ,
      nombreDeRealisations: 40,
      nombreAidesDisponibles: 0,
      titre: 'Quiz **de ouf**',
      sousTitre:
        'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
      commune: 'Noisiel',
      corps: {
        astuces: `<h2>Nos <span class="text--bold">astuces</span></h2><ul>
<li><span class="text--bold">Revisitez vos classiques</span> : Lasagnes aux légumes, chili sin carne, redécouvrez vos plats favoris en version végétarienne.</li>
</ul>
`,
        introduction: ``,
      },
      quizzes: [
        {
          id: 'id-quiz-1',
          titre: 'Quiz 1',
          questions: [
            {
              intitule: 'Intitule quiz 1',
              reponsesPossibles: ['toto', 'tota'],
              ordre: '',
              texteExplicationOK: 'Texte OK !',
              texteExplicationKO: 'Text KO !',
              solution: 'toto',
            },
          ],
          nombreDePointsAGagner: 5,
          articleAssocie: {
            id: 'article-1',
            contenu: "<span class='text--bold'>Voici le</span> contenu de l'article",
            sources: [
              {
                label: 'source 1',
                url: 'url-source-1',
              },
            ],
          },
          difficulte: QuizDifficulte.FACILE,
          clefThematiqueAPI: ClefThematiqueAPI.alimentation,
        },
        {
          id: 'id-quiz-2',
          titre: 'Quiz 2',
          questions: [
            {
              intitule: 'Intitule quiz 2',
              reponsesPossibles: ['toto', 'tota'],
              ordre: '',
              texteExplicationOK: 'Texte OK !',
              texteExplicationKO: 'Text KO !',
              solution: 'tota',
            },
          ],
          nombreDePointsAGagner: 5,
          articleAssocie: {
            id: 'article-2',
            contenu: "<span class='text--bold'>Voici le</span> contenu de l'article",
            sources: [
              {
                label: 'source 1',
                url: 'url-source-1',
              },
              {
                label: 'source 2',
                url: 'url-source-2',
              },
            ],
          },
          difficulte: QuizDifficulte.FACILE,
          clefThematiqueAPI: ClefThematiqueAPI.alimentation,
        },
      ],
      articles: [],
      services: [
        {
          type: 'recettes',
          parametreDuService: { categorie: 'recette-vegetarienne' },
        },
        {
          type: 'longue_vie_objets',
          parametreDuService: { categorie: 'reparer' },
        },
      ],
      faq: [],
      sources: [],
      idEnchainementKYCs: '',
      explicationsRecommandations: new ExplicationsRecommandation(true, [
        { labelExplication: "Vous n'aimez pas les quizz", tag: 'pas-quizz' },
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
        expected,
        () => {},
        () => {},
      ),
    );
    await usecase.execute('id-utilisateur', 'id-action', TypeAction.QUIZZ);

    function expected(viewModel: ActionQuizzesViewModel): void {
      expect(viewModel).toStrictEqual<ActionQuizzesViewModel>({
        realisee: false,
        points: 20,
        consigne: 'Consigne',
        labelCompteur: '100 quizs réalisés',
        nombreDeRealisations: 40,
        actionId: 'id-action-test',
        titre: '<span aria-hidden="true">🍽</span>️ Quiz <span class="text--bold">de ouf</span>',
        sousTitre:
          'Faites des économies et le plein de vitamines ! Cette semaine, on cuisine une recette saine et délicieuse !',
        titreAffiche: 'Quiz - <span aria-hidden="true">🍽</span>️ Quiz <span class="text--bold">de ouf</span>',
        titrePropre: 'Quiz de ouf',
        introduction: '',
        quizzFelicitations: 'Félicitations ! ',
        quizzes: [
          {
            id: 'id-quiz-1',
            titre: 'Quiz 1',
            question: {
              intitule: 'Intitule quiz 1',
              reponsesPossibles: [
                { label: 'toto', value: 'toto' },
                { label: 'tota', value: 'tota' },
              ],
              ordre: '',
              texteExplicationOK: 'Texte OK !',
              texteExplicationKO: 'Text KO !',
              solution: 'toto',
            },
            nombreDePointsAGagner: '5',
            articleAssocie: {
              id: 'article-1',
              contenu: "<span class='text--bold'>Voici le</span> contenu de l'article",
              sources: [
                {
                  label: 'source 1',
                  url: 'url-source-1',
                },
              ],
            },
          },
          {
            id: 'id-quiz-2',
            titre: 'Quiz 2',
            question: {
              intitule: 'Intitule quiz 2',
              reponsesPossibles: [
                { label: 'toto', value: 'toto' },
                { label: 'tota', value: 'tota' },
              ],
              ordre: '',
              texteExplicationOK: 'Texte OK !',
              texteExplicationKO: 'Text KO !',
              solution: 'tota',
            },
            nombreDePointsAGagner: '5',
            articleAssocie: {
              id: 'article-2',
              contenu: "<span class='text--bold'>Voici le</span> contenu de l'article",
              sources: [
                {
                  label: 'source 1',
                  url: 'url-source-1',
                },
                {
                  label: 'source 2',
                  url: 'url-source-2',
                },
              ],
            },
          },
        ],
        articlesRecommandes: [],
        sources: [],
        explicationsRecommandation: undefined,
      });
    }
  });
});
