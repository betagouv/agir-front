import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import { Question, QuestionMetaData } from '@/domaines/kyc/recupererQuestion.usecase';

export class MockListeQuestionsRepository implements QuestionRepository {
  constructor(private questionARetourner: Question[]) {}

  recupererListeQuestions(utilisateurId: string): Promise<Question[]> {
    return Promise.resolve(this.questionARetourner);
  }

  recupererQuestion(_questionId: string, _utilisateurId: string): Promise<Question> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(_questionId: string, _utilisateurId: string, _reponse: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererQuestionsThematique(utilisateurId: string, thematiqueId: string): Promise<Question[]> {
    return Promise.resolve(this.questionARetourner);
  }

  envoyerReponsesMultiples(
    utilisateurId: string,
    questionId: string,
    reponses: {
      code: string;
      boolean_value: boolean;
    }[],
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererQuestionsDepuisMissionOnboarding(utilisateurId: string): Promise<Question[]> {
    return Promise.resolve(this.questionARetourner);
  }

  recupererQuestionsSimulateur(utilisateurId: string, simulateurActionId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }

  recupererPremiereQuestion(utilisateurId: string, enchainementId: string): Promise<QuestionMetaData> {
    throw new Error('Method not implemented.');
  }

  recupererProchaineQuestion(
    utilisateurId: string,
    enchainementId: string,
    questionCouranteId: string,
  ): Promise<QuestionMetaData> {
    throw new Error('Method not implemented.');
  }

  recupererPrecedenteQuestion(
    utilisateurId: string,
    enchainementId: string,
    questionCouranteId: string,
  ): Promise<QuestionMetaData> {
    throw new Error('Method not implemented.');
  }
}
