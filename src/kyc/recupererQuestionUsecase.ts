import { QuestionPresenter } from '@/kyc/ports/question.presenter';
import { QuestionRepository } from '@/kyc/ports/question.repository';

export interface Question {
  id: string;
  libelle: string;
  type: 'ouvert' | 'choix_multiple' | 'choix_unique';
  choix: string[];
}

export class RecupererQuestionUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(questionId: string, utilisateurId: string, questionPresenter: QuestionPresenter): Promise<void> {
    const question = await this.questionRepository.recupererQuestion(questionId, utilisateurId);
    questionPresenter.presente(question);
  }
}
