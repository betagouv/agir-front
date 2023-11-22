import { Quiz, QuizRepository } from '@/quiz/ports/quizRepository';
import { ChargementQuizUsecase } from '@/quiz/chargementQuiz.usecase';
import { ChargementQuizPresenterImpl, QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';

class QuizRepositoryForTest implements QuizRepository {
  async getQuiz(id: string): Promise<Quiz> {
    return {
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
        titre: 'Mon super quizz 1',
        questions: [
          {
            id: '1',
            ordre: '1',
            intitule: 'Une question ?',
            reponsesPossibles: ['Reponse 1', 'Reponse 2'],
            texteExplicationKO: "Un texte d'explication KO",
            texteExplicationOK: "Un texte d'explication OK",
            solution: 'Reponse 1',
          },
        ],
        steps: '2',
      });
    }
  });
});
