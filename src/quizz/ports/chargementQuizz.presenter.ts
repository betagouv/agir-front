import { Quizz } from "@/quizz/ports/quizzRepository.ts";

export interface ChargementQuizzPresenter {
  presenteQuizz(quizz: Quizz): void;
}
