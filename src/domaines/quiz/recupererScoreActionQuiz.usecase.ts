import { QuizRepository } from '@/domaines/quiz/ports/quiz.repository';
import { ScoreActionQuizPresenter } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';

export class RecupererScoreActionQuizUsecase {
  constructor(private readonly quizRepository: QuizRepository) {}

  async execute(idUtilisateur: string, idAction: string, presenter: ScoreActionQuizPresenter): Promise<void> {
    const score = await this.quizRepository.recupererScoreActionQuiz(idUtilisateur, idAction);
    presenter.presente(score);
  }
}
