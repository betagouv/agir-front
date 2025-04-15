import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import { Question, QuestionMetaData } from '@/domaines/kyc/recupererQuestion.usecase';

export class MockQuestionRepository implements QuestionRepository {
  constructor(private questionARetourner: Question) {}

  recupererQuestionsThematique(_utilisateurId: string, _thematiqueId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }

  recupererListeQuestions(_utilisateurId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }

  recupererQuestion(_questionId: string, _utilisateurId: string): Promise<Question> {
    return Promise.resolve(this.questionARetourner);
  }

  envoyerReponse(_questionId: string, _utilisateurId: string, _reponse: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  envoyerReponsesMultiples(
    utilisateurId: string,
    questionId: string,
    reponses: {
      code: string;
      boolean_value: boolean;
    }[],
  ): Promise<void> {
    return Promise.resolve(undefined);
  }

  recupererQuestionsDepuisMissionOnboarding(utilisateurId: string): Promise<Question[]> {
    return Promise.resolve([]);
  }

  recupererQuestionsSimulateur(utilisateurId: string, simulateurActionId: string): Promise<Question[]> {
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

  recupererPremiereQuestion(utilisateurId: string, enchainementId: string): Promise<QuestionMetaData> {
    throw new Error('Method not implemented.');
  }
}
