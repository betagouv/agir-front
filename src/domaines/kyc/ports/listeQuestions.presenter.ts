import { Question } from '@/domaines/kyc/recupererQuestionUsecase';

export interface QuestionDansLeCompteViewModel {
  id: string;
  libelle: string;
  reponse: string;
  description: string;
}
export interface ListeQuestionsPresenter {
  presente(questions: Question[]): void;
}
