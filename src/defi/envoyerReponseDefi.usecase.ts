import { EventBus } from '@/shell/eventBus';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { DefiRepository } from '@/defi/ports/defi.repository';

export class EnvoyerReponseDefiUsecase {
  constructor(
    private readonly defiRepository: DefiRepository,
    private readonly eventBus: EventBus<ToDoListEvent>,
  ) {}

  async execute(utilisateurId: string, defiId: string, reponse: string[]): Promise<void> {
    await this.defiRepository.envoyerReponse(utilisateurId, defiId, reponse);
    this.eventBus.publish(ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
  }
}
