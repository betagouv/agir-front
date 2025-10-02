import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class EnvoyerReponsesMultiplesUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(
    utilisateurId: string,
    questionId: string,
    reponses: { code: string; boolean_value: boolean }[],
  ): Promise<void> {
    await this.questionRepository.envoyerReponsesMultiples(utilisateurId, questionId, reponses);
  }
}
