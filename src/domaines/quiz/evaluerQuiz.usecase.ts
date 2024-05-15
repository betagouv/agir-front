import { QuizRepository } from '@/domaines/quiz/ports/quizRepository';

export class EvaluerQuizUsecase {
  constructor(private quizRepository: QuizRepository) {}
  execute(quizId: string, utilisateurId: string, note: 1 | 2 | 3 | 4) {
    return this.quizRepository.noterQuiz(quizId, utilisateurId, note);
  }
}
