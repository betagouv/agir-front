import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import { Question, QuestionMetaData } from '@/domaines/kyc/recupererQuestion.usecase';

export class MockListeQuestionsRepository implements QuestionRepository {
  constructor(private questionARetourner: Question[]) {}

  recupererListeQuestions(_utilisateurId: string): Promise<Question[]> {
    return Promise.resolve(this.questionARetourner);
  }

  recupererQuestion(_questionId: string, _utilisateurId: string): Promise<Question> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(_questionId: string, _utilisateurId: string, _reponse: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  envoyerReponsesMultiples(
    _utilisateurId: string,
    _questionId: string,
    _reponses: {
      code: string;
      boolean_value: boolean;
    }[],
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererPremiereQuestion(_utilisateurId: string, _enchainementId: string): Promise<QuestionMetaData> {
    throw new Error('Method not implemented.');
  }

  recupererProchaineQuestion(
    _utilisateurId: string,
    _enchainementId: string,
    _questionCouranteId: string,
  ): Promise<QuestionMetaData> {
    throw new Error('Method not implemented.');
  }

  recupererPrecedenteQuestion(
    _utilisateurId: string,
    _enchainementId: string,
    _questionCouranteId: string,
  ): Promise<QuestionMetaData> {
    throw new Error('Method not implemented.');
  }

  passerLaQuestion(utilisateurId: string, questionId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
