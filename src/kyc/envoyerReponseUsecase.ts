import { QuestionRepository } from '@/kyc/ports/question.repository';

export class EnvoyerReponseUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(utilisateurId: string, questionId: string, reponse: string): Promise<void> {
    await this.questionRepository.envoyerReponse(utilisateurId, questionId, reponse);
  }
}
