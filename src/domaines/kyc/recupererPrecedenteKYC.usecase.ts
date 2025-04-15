import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererPrecedenteKYCUsecase {
  constructor(private readonly repository: QuestionRepository) {}

  async execute(
    utilisateurId: string,
    echainementId: string,
    questionCouranteId: string,
    presenter: QuestionPresenter,
  ): Promise<void> {
    const question = await this.repository.recupererPrecedenteQuestion(
      utilisateurId,
      echainementId,
      questionCouranteId,
    );
    presenter.presente(question);
  }
}
