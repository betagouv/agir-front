import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererEnchainementQuestionsUsecase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(utilisateurId: string, contentId: string, presenter: ListeQuestionsPresenter): Promise<void> {
    const questions = await this.questionRepository.recupererQuestionsDepuisMissionOnboarding(utilisateurId, contentId);
    presenter.presente(questions);
  }
}
