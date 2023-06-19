import { Quiz } from "@/quizz/ports/quizRepository.ts";

export interface ChargementQuizzPresenter {
  presenteQuiz(quizz: Quiz): void;
}
