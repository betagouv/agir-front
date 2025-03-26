import { Quiz, QuizRepository, ScoreQuiz } from '@/domaines/quiz/ports/quiz.repository';
import { ScoreActionQuizViewModel } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';
import { ScoreActionQuizPresenterImpl } from '@/domaines/quiz/adapters/scoreActionQuiz.presenter.impl';
import { FinActionQuizUsecase } from '@/domaines/quiz/finActionQuizz.usecase';
import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
import { ActionsRepositoryMock } from '../actions/adapters/actions.repository.mock';
import { EventBus } from '@/shell/eventBus';
import { ActionsEvent } from '@/domaines/actions/actions.eventbus';

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

export class SpyActionsEventBus extends EventBus<ActionsEvent> {
  eventSubscribers: Record<ActionsEvent, { subscriberName: string; callback: () => void }[]> = {
    [ActionsEvent.A_ETE_REALISEE]: [],
    [ActionsEvent.RESET_VU]: [],
  };

  private _eventName: ActionsEvent | null = null;

  get eventName(): ActionsEvent | null {
    return this._eventName;
  }

  publish(eventName: ActionsEvent): void {
    super.publish(eventName);
    this._eventName = eventName;
  }
}

describe("Fichier de test pour la fin d'une action quiz", () => {
  it("Afficher correctement les informations quand le score du quiz est < à 40% et n'appelle le usecase terminer action", async () => {
    // GIVEN
    const score = new ScoreQuiz(4, 11);
    const repository = new QuizRepositoryForTest(score);
    const spyActionBus = new SpyActionsEventBus();
    const usecase = new FinActionQuizUsecase(
      repository,
      new TerminerActionUsecase(ActionsRepositoryMock.empty(), spyActionBus),
    );
    // WHEN
    await usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    // THEN

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

    expect(spyActionBus.eventName).toBeNull();
  });

  it("ficher correctement les informations quand le score du quiz est < à 70% et n'appelle pas le usecase terminer", async () => {
    // GIVEN
    const score = new ScoreQuiz(7, 11);
    const repository = new QuizRepositoryForTest(score);
    const spyActionBus = new SpyActionsEventBus();

    // WHEN
    const usecase = new FinActionQuizUsecase(
      repository,
      new TerminerActionUsecase(ActionsRepositoryMock.empty(), spyActionBus),
    );
    await usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    // THEN
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

    expect(spyActionBus.eventName).toBeNull();
  });

  it('Afficher correctement les informations quand le score du quiz est > à 70% et doit appeler le usecase terminer action', async () => {
    // GIVEN
    const score = new ScoreQuiz(4, 6);

    const repository = new QuizRepositoryForTest(score);
    const spyActionBus = new SpyActionsEventBus();
    const usecase = new FinActionQuizUsecase(
      repository,
      new TerminerActionUsecase(ActionsRepositoryMock.empty(), spyActionBus),
    );

    // WHEN
    await usecase.execute('id-utilisateur', 'id-action', new ScoreActionQuizPresenterImpl(expectation));

    // THEN
    function expectation(viewmodel: ScoreActionQuizViewModel) {
      expect(viewmodel).toStrictEqual<ScoreActionQuizViewModel>({
        score: '4 bonnes réponses sur 6 (67%)',
        scoreConfig: {
          emoji: '👏',
          couleurBackground: '#FAFCED',
          couleurBordure: '#CBE1AA',
        },
        encouragement: 'Nous espérons que ce quiz vous aura permis d’en apprendre d’avantage !',
      });
    }

    expect(spyActionBus.eventName).toStrictEqual(ActionsEvent.A_ETE_REALISEE);
  });
});
