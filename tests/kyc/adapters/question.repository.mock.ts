import { QuestionRepository } from '@/kyc/ports/question.repository';
import { Question } from '@/kyc/recupererQuestionUsecase';

export class MockQuestionRepository implements QuestionRepository {
  constructor(private questionARetourner: Question) {}
  recupererListeQuestions(utilisateurId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }
  recupererQuestion(_questionId: string, _utilisateurId: string): Promise<Question> {
    return Promise.resolve(this.questionARetourner);
  }

  envoyerReponse(_questionId: string, _utilisateurId: string, _reponse: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
