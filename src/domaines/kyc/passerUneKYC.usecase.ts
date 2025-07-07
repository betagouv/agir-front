import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class PasserUneKYCUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(utilisateurId: string, questionId: string): Promise<void> {
    await this.questionRepository.passerLaQuestion(utilisateurId, questionId);
  }
}
