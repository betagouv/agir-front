import { Question } from '@/domaines/kyc/recupererQuestion.usecase';
import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';

export class SpyQuestionRepository implements QuestionRepository {
  private _envoyerReponseMosaicArgs: {
    questionId: string;
    utilisateurId: string;
    reponses: { code: string; boolean_value: boolean }[];
  } = {
    questionId: '',
    utilisateurId: '',
    reponses: [],
  };

  get envoyerReponseMosaicArgs(): {
    questionId: string;
    utilisateurId: string;
    reponses: { code: string; boolean_value: boolean }[];
  } {
    return this._envoyerReponseMosaicArgs;
  }

  private _envoyerQuestionAEteAppele: boolean = false;

  get envoyerQuestionAEteAppele(): boolean {
    return this._envoyerQuestionAEteAppele;
  }

  private _envoyerQuestionArgs: { questionId: string; utilisateurId: string; reponse: string } = {
    questionId: '',
    utilisateurId: '',
    reponse: '',
  };

  get envoyerQuestionArgs() {
    return this._envoyerQuestionArgs;
  }

  recupererQuestionsThematique(_utilisateurId: string, _thematiqueId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }

  recupererListeQuestions(_utilisateurId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }

  recupererQuestion(_questionId: string, _utilisateurId: string): Promise<Question> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(_utilisateurId: string, _questionId: string, _reponse: string): Promise<void> {
    this._envoyerQuestionAEteAppele = true;
    this._envoyerQuestionArgs = {
      questionId: _questionId,
      utilisateurId: _utilisateurId,
      reponse: _reponse,
    };
    return Promise.resolve();
  }

  envoyerReponsesMultiples(
    utilisateurId: string,
    questionId: string,
    reponses: {
      code: string;
      boolean_value: boolean;
    }[],
  ): Promise<void> {
    this._envoyerReponseMosaicArgs = {
      utilisateurId,
      questionId,
      reponses,
    };
    return Promise.resolve();
  }

  recupererQuestionsDepuisMissionOnboarding(utilisateurId: string): Promise<Question[]> {
    return Promise.resolve([]);
  }

  recupererQuestionsSimulateur(utilisateurId: string, simulateurActionId: string): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }
}
