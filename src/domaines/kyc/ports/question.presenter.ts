import { QuestionMetaData } from '@/domaines/kyc/recupererQuestion.usecase';

export interface QuestionPresenter {
  presente(question: QuestionMetaData): void;

  finAtteinte(): void;
}
