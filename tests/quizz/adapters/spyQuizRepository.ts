import { Quiz, QuizRepository } from '@/quiz/ports/quizRepository';

export class SpyQuizRepository implements QuizRepository {
  get marquerLeQuizArticleCommeLuAEteAppele(): boolean {
    return this._marquerLeQuizArticleCommeLuAEteAppele;
  }
  private _marquerLeQuizArticleCommeLuAEteAppele: boolean = false;
  marquerLeQuizArticleCommeLu(utilisateurId: string, articleId: string): Promise<void> {
    this._marquerLeQuizArticleCommeLuAEteAppele = true;
    return Promise.resolve();
  }
  get noterQuizAEteAppele(): boolean {
    return this._noterQuizAEteAppele;
  }
  private _noterQuizAEteAppele: boolean = false;
  get noterQuizArgs(): { quizId: string; utilisateurId: string; note: 1 | 2 | 3 | 4 } {
    return this._noterQuizArgs;
  }
  private _noterQuizArgs: { quizId: string; utilisateurId: string; note: 1 | 2 | 3 | 4 } = {
    quizId: '',
    utilisateurId: '',
    note: 1,
  };

  noterQuiz(quizId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    this._noterQuizArgs = {
      quizId,
      utilisateurId,
      note,
    };

    this._noterQuizAEteAppele = true;

    return Promise.resolve();
  }

  get score(): number {
    return this._score;
  }

  private _score: number = 0;

  get termineQuizAEteAppele(): boolean {
    return this._termineQuizAEteAppele;
  }

  private _termineQuizAEteAppele: boolean = false;

  getQuiz(id: string): Promise<Quiz> {
    throw Error;
  }

  terminerQuiz(idUtilisateur: string, idInteraction: string, score: number): Promise<void> {
    this._termineQuizAEteAppele = true;
    this._score = score;
    return Promise.resolve();
  }
}
