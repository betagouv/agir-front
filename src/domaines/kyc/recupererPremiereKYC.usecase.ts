import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererPremiereKYCUsecase {
  constructor(private readonly repository: QuestionRepository) {}

  async recupererPremiereKYC(
    utilisateurId: string,
    echainementId: string,
    presenter: QuestionPresenter,
  ): Promise<void> {
    const question = await this.repository.recupererPremiereQuestion(utilisateurId, echainementId);
    presenter.presente(question);
  }
}
