import { Quiz, QuizRepository } from '@/domaines/quiz/ports/quizRepository';
import { ChargementQuizUsecase } from '@/domaines/quiz/chargementQuiz.usecase';
import { ChargementQuizPresenterImpl, QuizViewModel } from '@/domaines/quiz/adapters/chargementQuiz.presenter.impl';

class QuizRepositoryForTest implements QuizRepository {
  marquerLeQuizArticleCommeLu(_utilisateurId: string, _articleId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  noterQuiz(_quizId: any, _utilisateurId: any, _note: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getQuiz(id: string): Promise<Quiz> {
    return {
      nombreDePointsAGagner: 10,
      difficulte: 1,
      thematique: '🛒 Consommation durable',
      titre: `Mon super quizz ${id}`,
      questions: [
        {
          id: '1',
          ordre: '1',
          intitule: 'Une question ?',
          reponsesPossibles: ['Reponse 1', 'Reponse 2'],
          texteExplicationOK: "Un texte d'explication OK",
          texteExplicationKO: "Un texte d'explication KO",
          solution: 'Reponse 1',
        },
      ],
      articleAssocie: null,
    };
  }
  async terminerQuiz(idUtilisateur: string, idInteraction: string, score: number): Promise<void> {
    return Promise.resolve();
  }
}

describe("Fichier de test du usecase de chargement d'un quizz", () => {
  it('En donnant un id de quizz, doit me retourne le quizz', async () => {
    // GIVEN
    const chargementQuizzUsecase = new ChargementQuizUsecase(new QuizRepositoryForTest());

    // WHEN
    await chargementQuizzUsecase.execute('1', new ChargementQuizPresenterImpl(expectation));

    // THEN
    function expectation(quizzViewModel: QuizViewModel) {
      expect(quizzViewModel).toStrictEqual<QuizViewModel>({
        nombreDePointsAGagner: '10',
        difficulte: 'très facile',
        thematique: '🛒 Consommation durable',
        titre: 'Mon super quizz 1',
        question: {
          id: '0',
          ordre: '1',
          intitule: 'Une question ?',
          reponsesPossibles: ['Reponse 1', 'Reponse 2'],
          texteExplicationKO: "Un texte d'explication KO",
          texteExplicationOK: "Un texte d'explication OK",
          solution: 'Reponse 1',
        },

        articleAssocie: null,
      });
    }
  });
});
