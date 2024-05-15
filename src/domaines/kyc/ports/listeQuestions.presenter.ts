import { Question } from '@/domaines/kyc/recupererQuestionUsecase';

export interface QuestionViewModel {
  id: string;
  libelle: string;
  reponse: string;
  description: string;
}
export interface ListeQuestionsPresenter {
  presente(questions: Question[]): void;
}
