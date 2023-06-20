import { Quiz } from "@/quiz/ports/quizRepository.ts";

export interface ChargementQuizzPresenter {
  presenteQuiz(quizz: Quiz): void;
}
