import { FinAtteinteException } from '@/domaines/kyc/adapters/question.repository.axios';
import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class RecupererProchaineKYCUsecase {
  constructor(private readonly repository: QuestionRepository) {}

  async execute(
    utilisateurId: string,
    echainementId: string,
    questionCouranteId: string,
    presenter: QuestionPresenter,
  ): Promise<void> {
    try {
      const question = await this.repository.recupererProchaineQuestion(
        utilisateurId,
        echainementId,
        questionCouranteId,
      );
      presenter.presente(question);
    } catch (e) {
      if (e instanceof FinAtteinteException) {
        presenter.finAtteinte();
      }
    }
  }
}
