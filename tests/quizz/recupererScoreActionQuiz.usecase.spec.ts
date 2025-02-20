import { Quiz, QuizRepository, ScoreQuiz } from '@/domaines/quiz/ports/quizRepository';
import { RecuperScoreActionQuizUsecase } from '@/domaines/quiz/recupererScoreActionQuiz.usecase';
import { ScoreExamenPresenterImpl } from '@/domaines/examens/adapters/scoreExamen.presenter.impl';
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
    const score = 39;
    const repository = new QuizRepositoryForTest(score);

    const usecase = new RecuperScoreActionQuizUsecase(repository);
    usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    function expectation(viewmodel: ScoreActionQuizViewModel) {
      expect(viewmodel).toStrictEqual({
        presentationScore: {
          emoji: '😬',
          phraseScore: 'Vous avez obtenu un score de 39%',
          couleurBackground: '#FEF7F7',
          couleurBordure: '#FFCACA',
        },
        encouragement: 'Bravo ! Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
      });
    }
  });

  it('Afficher correctement les informations quand le score du quiz est < à 70%', () => {
    const score = 69;
    const repository = new QuizRepositoryForTest(score);

    const usecase = new RecuperScoreActionQuizUsecase(repository);
    usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    function expectation(viewmodel: ScoreActionQuizViewModel) {
      expect(viewmodel).toStrictEqual({
        presentationScore: {
          emoji: '🙃',
          phraseScore: 'Vous avez obtenu un score de 69%',
          couleurBackground: '#FCFAED',
          couleurBordure: '#E1D9AA',
        },
        encouragement: 'Bravo ! Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
      });
    }
  });

  it('Afficher correctement les informations quand le score du quiz est > à 70%', () => {
    const score = 80;
    const repository = new QuizRepositoryForTest(score);

    const usecase = new RecuperScoreActionQuizUsecase(repository);
    usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    function expectation(viewmodel: ScoreActionQuizViewModel) {
      expect(viewmodel).toStrictEqual({
        presentationScore: {
          emoji: '👏',
          phraseScore: 'Vous avez obtenu un score de 80%',
          couleurBackground: '#FAFCED',
          couleurBordure: '#CBE1AA',
        },
        encouragement: 'Bravo ! Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
      });
    }
  });
});
