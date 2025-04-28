import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { FaqRepository } from '@/domaines/faq/ports/faq.repository';

export class EnvoyerQuestionFAQUsecase {
  constructor(private readonly faqRepository: FaqRepository) {}

  async execute(idUtilisateur: string, idAction: string, typeAction: TypeAction, question: string): Promise<void> {
    await this.faqRepository.envoyerQuestion(idUtilisateur, idAction, typeAction, question);
  }
}
