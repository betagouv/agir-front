import { Question } from '@/kyc/recupererQuestionUsecase';

export interface QuestionPresenter {
  presente(question: Question): void;
}
