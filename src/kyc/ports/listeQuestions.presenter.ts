import { Question } from '@/kyc/recupererQuestionUsecase';

export interface QuestionViewModel {
  id: string;
  libelle: string;
  reponse: string;
  description: string;
}
export interface ListeQuestionsPresenter {
  presente(questions: Question[]): void;
}
