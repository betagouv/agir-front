import { QuizRepository } from '@/domaines/quiz/ports/quizRepository';
import { ScoreActionQuizPresenter } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';

export class RecuperScoreActionQuizUsecase {
  constructor(private readonly quizRepository: QuizRepository) {}

  async execute(idUtilisateur: string, idAction: string, presenter: ScoreActionQuizPresenter): Promise<void> {
    const score = await this.quizRepository.recupererScoreActionQuiz(idUtilisateur, idAction);
    presenter.presente(score);
  }
}
