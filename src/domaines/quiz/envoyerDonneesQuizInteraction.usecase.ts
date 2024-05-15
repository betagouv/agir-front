import { QuizRepository } from '@/domaines/quiz/ports/quizRepository';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class EnvoyerDonneesQuizInteractionUsecase {
  constructor(
    private quizRepository: QuizRepository,
    private todoListEventBus: EventBus<ToDoListEvent>,
  ) {}

  async execute(utilisateurId: string, quizId: string, pourcentageDeReussite: 0 | 100, articleId: string | null) {
    await this.quizRepository.terminerQuiz(utilisateurId, quizId, pourcentageDeReussite);
    if (articleId) {
      await this.quizRepository.marquerLeQuizArticleCommeLu(utilisateurId, articleId);
    }
    this.todoListEventBus.publish(ToDoListEvent.TODO_QUIZ_ETE_TERMINE);
  }
}
