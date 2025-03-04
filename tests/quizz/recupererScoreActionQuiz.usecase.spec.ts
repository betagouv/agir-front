import { Quiz, QuizRepository, ScoreQuiz } from '@/domaines/quiz/ports/quiz.repository';
import { RecupererScoreActionQuizUsecase } from '@/domaines/quiz/recupererScoreActionQuiz.usecase';
import { ScoreActionQuizViewModel } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';
import { ScoreActionQuizPresenterImpl } from '@/domaines/quiz/adapters/scoreActionQuiz.presenter.impl';

class QuizRepositoryForTest implements QuizRepository {
  constructor(private readonly scoreARetourner: ScoreQuiz) {}

  marquerLeQuizArticleCommeLu(_utilisateurId: string, _articleId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  noterQuiz(_quizId: any, _utilisateurId: any, _note: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getQuiz(id: string): Promise<Quiz> {
    throw new Error('Method not implemented.');
  }

  terminerQuiz(idUtilisateur: string, idInteraction: string, score: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getPrevisualisationQuiz(idQuiz: string): Promise<Quiz> {
    throw new Error('Method not implemented.');
  }

  async recupererScoreActionQuiz(idUtilisateur: string, idAction: string): Promise<ScoreQuiz> {
    return Promise.resolve(this.scoreARetourner);
  }
}

describe('Fichier de test pour la récupération du score action quiz', () => {
  it('Afficher correctement les informations quand le score du quiz est < à 40%', () => {
    const score: ScoreQuiz = {
      nombreBonnesReponses: 4,
      nombreQuestions: 11,
    };
    const repository = new QuizRepositoryForTest(score);

    const usecase = new RecupererScoreActionQuizUsecase(repository);
    usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    function expectation(viewmodel: ScoreActionQuizViewModel) {
      expect(viewmodel).toStrictEqual<ScoreActionQuizViewModel>({
        score: '4 bonnes réponses sur 11 (36%)',
        scoreConfig: {
          emoji: '😬',
          couleurBackground: '#FEF7F7',
          couleurBordure: '#FFCACA',
        },
        encouragement: 'Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
      });
    }
  });

  it('Afficher correctement les informations quand le score du quiz est < à 70%', () => {
    const score = {
      nombreBonnesReponses: 7,
      nombreQuestions: 11,
    };
    const repository = new QuizRepositoryForTest(score);

    const usecase = new RecupererScoreActionQuizUsecase(repository);
    usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    function expectation(viewmodel: ScoreActionQuizViewModel) {
      expect(viewmodel).toStrictEqual<ScoreActionQuizViewModel>({
        score: '7 bonnes réponses sur 11 (64%)',
        scoreConfig: {
          emoji: '🙃',
          couleurBackground: '#FCFAED',
          couleurBordure: '#E1D9AA',
        },
        encouragement: 'Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
      });
    }
  });

  it('Afficher correctement les informations quand le score du quiz est > à 70%', () => {
    const score = {
      nombreBonnesReponses: 10,
      nombreQuestions: 11,
    };
    const repository = new QuizRepositoryForTest(score);

    const usecase = new RecupererScoreActionQuizUsecase(repository);
    usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    function expectation(viewmodel: ScoreActionQuizViewModel) {
      expect(viewmodel).toStrictEqual<ScoreActionQuizViewModel>({
        score: '10 bonnes réponses sur 11 (91%)',
        scoreConfig: {
          emoji: '👏',
          couleurBackground: '#FAFCED',
          couleurBordure: '#CBE1AA',
        },
        encouragement: 'Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
      });
    }
  });
});
