import { Question } from '@/kyc/recupererQuestionUsecase';

export interface QuestionPresenter {
  present(question: Question): void;
}
