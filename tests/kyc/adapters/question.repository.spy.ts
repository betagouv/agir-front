import { Question } from '@/kyc/recupererQuestionUsecase';
import { QuestionRepository } from '@/kyc/ports/question.repository';

export class SpyQuestionRepository implements QuestionRepository {
  private _envoyerQuestionAEteAppele: boolean = false;

  recupererQuestion(questionId: string, utilisateurId: string): Promise<Question> {
    throw new Error('Method not implemented.');
  }
  envoyerReponse(_questionId: string, _utilisateurId: string, _reponse: string): Promise<void> {
    this._envoyerQuestionAEteAppele = true;
    return Promise.resolve();
  }

  get envoyerQuestionAEteAppele(): boolean {
    return this._envoyerQuestionAEteAppele;
  }
}
