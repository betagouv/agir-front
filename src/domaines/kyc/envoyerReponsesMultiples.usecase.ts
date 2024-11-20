import { QuestionRepository } from '@/domaines/kyc/ports/question.repository';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class EnvoyerReponsesMultiplesUsecase {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly eventBus: EventBus<ToDoListEvent>,
  ) {}

  async execute(
    utilisateurId: string,
    questionId: string,
    reponses: { code: string; boolean_value: boolean }[],
  ): Promise<void> {
    await this.questionRepository.envoyerReponsesMultiples(utilisateurId, questionId, reponses);
    this.eventBus.publish(ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
  }
}
