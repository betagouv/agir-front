import { Quiz, QuizRepository } from "../../src/quizz/ports/quizRepository";

export class QuizRepositoryEvaluerAvecDesBonnesReponses implements QuizRepository {
  getQuiz(id: number): Promise<Quiz> {
    console.log(id);
    throw Error();
  }

  evaluerQuiz(utilisateur: string, quizId: number, reponses: Map<string, string>): Promise<boolean> {
    console.log(utilisateur, quizId, reponses);
    return Promise.resolve(true);
  }
}
