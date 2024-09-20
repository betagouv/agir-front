import { Question } from '@/domaines/kyc/recupererQuestionUsecase';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class SpyQuestionRepository implements QuestionRepository {
  recupererQuestionsThematique(_utilisateurId: string, _thematiqueId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }

  recupererListeQuestions(_utilisateurId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }
  private _envoyerQuestionAEteAppele: boolean = false;

  private _envoyerQuestionArgs: { questionId: string; utilisateurId: string; reponse: string[] } = {
    questionId: '',
    utilisateurId: '',
    reponse: [],
  };

  recupererQuestion(_questionId: string, _utilisateurId: string): Promise<Question> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(_utilisateurId: string, _questionId: string, _reponse: string[]): Promise<void> {
    this._envoyerQuestionAEteAppele = true;
    this._envoyerQuestionArgs = {
      questionId: _questionId,
      utilisateurId: _utilisateurId,
      reponse: _reponse,
    };
    return Promise.resolve();
  }

  get envoyerQuestionAEteAppele(): boolean {
    return this._envoyerQuestionAEteAppele;
  }

  get envoyerQuestionArgs() {
    return this._envoyerQuestionArgs;
  }

  envoyerReponseMosaic(
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
    return Promise.resolve([]);
  }
}
