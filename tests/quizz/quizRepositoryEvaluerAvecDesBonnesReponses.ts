import { Quiz, QuizRepository } from "../../src/quiz/ports/quizRepository";

export class QuizRepositoryEvaluerAvecDesBonnesReponses implements QuizRepository {
  getQuiz(id: string): Promise<Quiz> {
    throw Error();
  }

  evaluerQuiz(utilisateur: string, quizId: string, reponses: Map<string, string>): Promise<boolean> {
    return Promise.resolve(true);
  }
}
