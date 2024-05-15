import { Quiz } from '@/domaines/quiz/ports/quizRepository';

export interface ChargementQuizzPresenter {
  presenteQuiz(quizz: Quiz): void;
}
