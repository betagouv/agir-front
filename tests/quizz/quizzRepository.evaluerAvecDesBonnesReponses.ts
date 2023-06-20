import { Quizz, QuizzRepository } from "../../src/quizz/ports/quizzRepository";

export class QuizzRepositoryEvaluerAvecDesBonnesReponses implements QuizzRepository {
  evaluerQuizz(utilisateur: string, quizzId: number, reponses: Map<string, string>): Promise<Boolean> {
    console.log(utilisateur, quizzId, reponses);
    return Promise.resolve(true);
  }

  getQuizz(id: number): Promise<Quizz> {
    console.log(id);
    throw Error();
  }
}
