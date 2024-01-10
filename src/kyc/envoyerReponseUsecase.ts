import { QuestionRepository } from '@/kyc/ports/question.repository';
import { EventBus } from '@/shell/eventBus';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';

export class EnvoyerReponseUsecase {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly eventBus: EventBus<ToDoListEvent>
  ) {}

  async execute(utilisateurId: string, questionId: string, reponse: string[]): Promise<void> {
    await this.questionRepository.envoyerReponse(utilisateurId, questionId, reponse);
    this.eventBus.publish(ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
  }
}
