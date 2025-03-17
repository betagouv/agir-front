import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
import { QuizRepository } from '@/domaines/quiz/ports/quiz.repository';
import { ScoreActionQuizPresenter } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';

export class FinActionQuizUsecase {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly terminerActionUsecase: TerminerActionUsecase,
  ) {}

  async execute(idUtilisateur: string, idAction: string, presenter: ScoreActionQuizPresenter): Promise<void> {
    const score = await this.quizRepository.recupererScoreActionQuiz(idUtilisateur, idAction);
    if (score.leQuizzAEteReussi()) {
      await this.terminerActionUsecase.execute(idUtilisateur, idAction, TypeAction.QUIZZ);
    }
    presenter.presente(score);
  }
}
