import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import { ReponseKYCSimple } from '@/domaines/kyc/recupererQuestionUsecase';

export class RecupererListeQuestionsUsecase {
  constructor(private readonly repository: QuestionRepository) {}

  async execute(utilisateurId: string, presenter: ListeQuestionsPresenter): Promise<void> {
    const listeQuestions = await this.repository.recupererListeQuestions(utilisateurId);
    presenter.presente(
      listeQuestions.filter(
        question => question.type !== 'mosaic_boolean' && (question.reponses as ReponseKYCSimple).reponse.length > 0,
      ),
    );
  }
}
