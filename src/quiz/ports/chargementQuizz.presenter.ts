import { Quiz } from '@/quiz/ports/quizRepository';

export interface ChargementQuizzPresenter {
  presenteQuiz(quizz: Quiz): void;
}
