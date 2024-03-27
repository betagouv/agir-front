import { ListeQuestionsPresenter } from '@/kyc/ports/listeQuestions.presenter';
import { QuestionRepository } from '@/kyc/ports/question.repository';

export class RecupererListeQuestionsUsecase {
  constructor(private readonly repository: QuestionRepository) {}

  async execute(utilisateurId: string, presenter: ListeQuestionsPresenter): Promise<void> {
    const listeQuestions = await this.repository.recupererListeQuestions(utilisateurId);
    presenter.presente(listeQuestions.filter(question => question.reponse?.length > 0));
  }
}
