import { QuizRepository } from '@/quiz/ports/quizRepository';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class EnvoyerDonneesQuizInteractionUsecase {
  constructor(private quizRepository: QuizRepository, private todoListEventBus: EventBus<ToDoListEvent>) {}

  async execute(
    utilisateurId: string,
    interactionId: string,
    nombreDeBonnesReponses: number,
    nombreDeQuestions: number
  ) {
    const pourcentageDeReussite = (nombreDeBonnesReponses / nombreDeQuestions) * 100;

    await this.quizRepository.terminerQuiz(utilisateurId, interactionId, pourcentageDeReussite);
    this.todoListEventBus.publish(ToDoListEvent.TODO_QUIZ_ETE_TERMINE);
  }
}
