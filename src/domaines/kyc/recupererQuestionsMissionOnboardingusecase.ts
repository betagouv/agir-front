import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererQuestionsMissionOnboardingUsecase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(utilisateurId: string, presenter: ListeQuestionsPresenter): Promise<void> {
    const questions = await this.questionRepository.recupererQuestionsDepuisMissionOnboarding(utilisateurId);
    presenter.presente(questions);
  }
}
