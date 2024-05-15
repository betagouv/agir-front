import { Question } from '@/domaines/kyc/recupererQuestionUsecase';

export interface QuestionPresenter {
  presente(question: Question): void;
}
