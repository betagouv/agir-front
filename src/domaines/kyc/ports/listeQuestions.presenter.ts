import { Question } from '@/domaines/kyc/recupererQuestion.usecase';

export interface QuestionDansLeCompteViewModel {
  id: string;
  libelle: string;
  reponse: string;
  description: string;
}
export interface ListeQuestionsPresenter {
  presente(questions: Question[]): void;
}
