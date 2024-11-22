import { Question } from '@/domaines/kyc/recupererQuestion.usecase';

export interface QuestionPresenter {
  presente(question: Question): void;
}
