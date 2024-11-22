import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererListeQuestionsReponduesUsecase {
  constructor(private readonly repository: QuestionRepository) {}

  async execute(utilisateurId: string, presenter: ListeQuestionsPresenter): Promise<void> {
    const listeQuestions = await this.repository.recupererListeQuestions(utilisateurId);
    presenter.presente(listeQuestions.filter(question => question.aEteRepondu));
  }
}
