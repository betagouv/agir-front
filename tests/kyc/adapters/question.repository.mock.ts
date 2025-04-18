import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import { Question, QuestionMetaData } from '@/domaines/kyc/recupererQuestion.usecase';
import { FinAtteinteException } from '@/domaines/kyc/adapters/question.repository.axios';

export class MockQuestionRepository implements QuestionRepository {
  constructor(private questionARetourner?: Question) {}

  recupererListeQuestions(_utilisateurId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }

  recupererQuestion(_questionId: string, _utilisateurId: string): Promise<Question> {
    return Promise.resolve(this.questionARetourner!);
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
    return Promise.resolve(undefined);
  }

  recupererProchaineQuestion(
    _utilisateurId: string,
    _enchainementId: string,
    _questionCouranteId: string,
  ): Promise<QuestionMetaData> {
    if (!this.questionARetourner) {
      throw new FinAtteinteException();
    }
    return Promise.resolve<QuestionMetaData>({
      question: this.questionARetourner,
      nombreTotalDeQuestions: 10,
      etapeCourante: 1,
    });
  }

  recupererPrecedenteQuestion(
    _utilisateurId: string,
    _enchainementId: string,
    _questionCouranteId: string,
  ): Promise<QuestionMetaData> {
    return Promise.resolve<QuestionMetaData>({
      question: this.questionARetourner!,
      nombreTotalDeQuestions: 10,
      etapeCourante: 1,
    });
  }

  recupererPremiereQuestion(_utilisateurId: string, _enchainementId: string): Promise<QuestionMetaData> {
    return Promise.resolve<QuestionMetaData>({
      question: this.questionARetourner!,
      nombreTotalDeQuestions: 10,
      etapeCourante: 1,
    });
  }
}
