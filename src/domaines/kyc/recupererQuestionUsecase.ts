import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export enum ThematiqueQuestion {
  ALIMENTATION = 'alimentation',
  TRANSPORT = 'transport',
  LOGEMENT = 'logement',
  DECHET = 'dechet',
  AUTRE = 'autre',
}

export interface QuestionLibre {
  reponses_possibles: string[];
  reponse: string[];
}
export interface QuestionChoixMultiple {
  reponses_possibles: string[];
  reponse: string[];
}
export interface QuestionChoixUnique {
  reponses_possibles: string[];
  reponse: string[];
}

export interface QuestionMosaicBoolean {
  reponse: {
    code: string;
    image_url: string;
    label: string;
    boolean_value: boolean;
  }[];
}
export interface Question {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean';
  points: number;
  thematique: ThematiqueQuestion;
  question: QuestionLibre | QuestionChoixMultiple | QuestionChoixUnique | QuestionMosaicBoolean;
}

export class RecupererQuestionUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(questionId: string, utilisateurId: string, questionPresenter: QuestionPresenter): Promise<void> {
    const question = await this.questionRepository.recupererQuestion(questionId, utilisateurId);
    questionPresenter.presente(question);
  }
}
