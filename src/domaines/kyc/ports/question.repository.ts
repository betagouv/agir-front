import { Question } from '@/domaines/kyc/recupererQuestionUsecase';

export interface QuestionRepository {
  recupererQuestion(questionId: string, utilisateurId: string): Promise<Question>;
  envoyerReponse(questionId: string, utilisateurId: string, reponse: string[]): Promise<void>;
  recupererListeQuestions(utilisateurId: string): Promise<Question[]>;
}
