import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererQuestionsSimulateurUsecase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(utilisateurId: string, actionSimulateurId: string, presenter: ListeQuestionsPresenter): Promise<void> {
    const questions = await this.questionRepository.recupererQuestionsSimulateur(utilisateurId, actionSimulateurId);
    presenter.presente(questions);
  }
}
