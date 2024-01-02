import { QuestionRepository } from '@/kyc/ports/question.repository';
import { Question } from '@/kyc/recupererQuestionUsecase';

export class MockQuestionRepository implements QuestionRepository {
  recupererQuestion(_questionId: string, _utilisateurId: string): Promise<Question> {
    return Promise.resolve({
      id: 'questionId',
      libelle: 'Une question',
      type: 'ouvert',
      choix: ['choix 1', 'choix 2'],
    });
  }

  envoyerReponse(_questionId: string, _utilisateurId: string, _reponse: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
