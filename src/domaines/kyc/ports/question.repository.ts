import { Question } from '@/domaines/kyc/recupererQuestionUsecase';

export interface QuestionRepository {
  recupererQuestion(questionId: string, utilisateurId: string): Promise<Question>;
  envoyerReponse(questionId: string, utilisateurId: string, reponse: string[]): Promise<void>;
  recupererListeQuestions(utilisateurId: string): Promise<Question[]>;
  recupererQuestionsThematique(utilisateurId: string, thematiqueId: string): Promise<Question[]>;
  envoyerReponseMosaic(
    utilisateurId: string,
    questionId: string,
    reponses: { code: string; valeur: boolean }[],
  ): Promise<void>;
}
