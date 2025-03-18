import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererQuestionsKYCsUsecase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(
    utilisateurId: string,
    actionSimulateurId: string,
    typeAction: TypeAction,
    presenter: ListeQuestionsPresenter,
  ): Promise<void> {
    const questions = await this.questionRepository.recupererQuestionsSimulateur(
      utilisateurId,
      actionSimulateurId,
      typeAction,
    );
    presenter.presente(questions);
  }
}
