import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererQuestionsThematiqueUsecase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(utilisateurId: string, thematiqueId: string, presenter: ListeQuestionsPresenter): Promise<void> {
    const questions = await this.questionRepository.recupererQuestionsThematique(utilisateurId, thematiqueId);
    presenter.presente(questions);
  }
}
