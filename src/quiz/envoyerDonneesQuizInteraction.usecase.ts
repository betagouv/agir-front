import { QuizRepository } from '@/quiz/ports/quizRepository';
import { ToDoListEvent, ToDoListEventBus } from '@/toDoList/toDoListEventBusImpl';

export class EnvoyerDonneesQuizInteractionUsecase {
  constructor(private quizRepository: QuizRepository, private todoListEventBus: ToDoListEventBus) {}

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
