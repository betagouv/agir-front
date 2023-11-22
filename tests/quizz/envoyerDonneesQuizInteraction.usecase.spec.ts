import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';
import { Quiz, QuizRepository } from '@/quiz/ports/quizRepository';

class SpyQuizRepository implements QuizRepository {
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

describe("Fichier de tests pour envoyer le resultat d'un quizz", () => {
  it("En donnant un id d'utilisateur, l'id d'une interaction valide dans le cas d'un quiz doit calucler le score et doit appeler le back pour prevenir que l'interaction a été faite", async () => {
    // GIVEN
    // WHEN
    const quizRepository = new SpyQuizRepository();
    const usecase = new EnvoyerDonneesQuizInteractionUsecase(quizRepository);
    await usecase.execute('1', '2', 2, 5);

    // THEN
    expect(quizRepository.termineQuizAEteAppele).toBeTruthy();
    expect(quizRepository.score).toBe(40);
  });
});
