import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export enum ThematiqueQuestion {
  ALIMENTATION = 'alimentation',
  TRANSPORT = 'transport',
  LOGEMENT = 'logement',
  DECHET = 'dechet',
  AUTRE = 'autre',
}

export interface ReponseKYCSimple {
  reponses_possibles: string[];
  reponse: string[];
  unite?: {
    abreviation: string;
    libelleLong: string;
  };
}

export interface ReponseMosaic<T> {
  reponse: {
    code: string;
    image_url?: string;
    emoji?: string;
    label: string;
    valeur: T;
  }[];
}

export interface ReponseMultiple {
  reponse: {
    code: string;
    label: string;
    estSelectionnee: boolean;
  }[];
}

export interface QuestionMetaData {
  question: Question;
  nombreTotalDeQuestions: number;
  etapeCourante: number;
}

export interface Question {
  id: string;
  libelle: string;
  sousLibelle?: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique' | 'mosaic_boolean' | 'entier' | 'decimal';
  points: number;
  thematique: ThematiqueQuestion;
  reponses: ReponseKYCSimple | ReponseMosaic<boolean> | ReponseMultiple;
  aEteRepondu: boolean;
  estObligatoire: boolean;
}

export class RecupererQuestionUsecase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute(questionId: string, utilisateurId: string, questionPresenter: QuestionPresenter): Promise<void> {
    const question = await this.questionRepository.recupererQuestion(questionId, utilisateurId);
    questionPresenter.presente({
      question,
      nombreTotalDeQuestions: 1,
      etapeCourante: 1,
    });
  }
}
