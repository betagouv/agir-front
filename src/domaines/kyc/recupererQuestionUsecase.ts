import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export enum ThematiqueQuestion {
  ALIMENTATION = 'alimentation',
  TRANSPORT = 'transport',
  LOGEMENT = 'logement',
  DECHET = 'dechet',
  AUTRE = 'autre',
}

export interface Question {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique';
  reponses_possibles: string[];
  points: number;
  reponse: string[];
  thematique: ThematiqueQuestion;
}

export class RecupererQuestionUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(questionId: string, utilisateurId: string, questionPresenter: QuestionPresenter): Promise<void> {
    const question = await this.questionRepository.recupererQuestion(questionId, utilisateurId);
    questionPresenter.presente(question);
  }
}
