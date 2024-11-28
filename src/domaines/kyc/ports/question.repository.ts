import { Question } from '@/domaines/kyc/recupererQuestion.usecase';

export interface QuestionRepository {
  recupererQuestion(questionId: string, utilisateurId: string): Promise<Question>;

  envoyerReponse(questionId: string, utilisateurId: string, reponse: string): Promise<void>;

  recupererListeQuestions(utilisateurId: string): Promise<Question[]>;

  envoyerReponsesMultiples(
    utilisateurId: string,
    questionId: string,
    reponses: { code: string; boolean_value: boolean }[],
  ): Promise<void>;

  recupererQuestionsDepuisMissionOnboarding(utilisateurId: string, contentId: string): Promise<Question[]>;
}
