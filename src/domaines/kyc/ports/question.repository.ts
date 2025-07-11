import { Question, QuestionMetaData } from '@/domaines/kyc/recupererQuestion.usecase';

export interface QuestionRepository {
  recupererQuestion(questionId: string, utilisateurId: string): Promise<Question>;

  recupererPremiereQuestion(utilisateurId: string, enchainementId: string): Promise<QuestionMetaData>;

  recupererProchaineQuestion(
    utilisateurId: string,
    enchainementId: string,
    questionCouranteId: string,
  ): Promise<QuestionMetaData>;

  recupererPrecedenteQuestion(
    utilisateurId: string,
    enchainementId: string,
    questionCouranteId: string,
  ): Promise<QuestionMetaData>;

  envoyerReponse(questionId: string, utilisateurId: string, reponse: string): Promise<void>;

  recupererListeQuestions(utilisateurId: string): Promise<Question[]>;

  envoyerReponsesMultiples(
    utilisateurId: string,
    questionId: string,
    reponses: { code: string; boolean_value: boolean }[],
  ): Promise<void>;

  passerLaQuestion(utilisateurId: string, questionId: string): Promise<void>;
}
