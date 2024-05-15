import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class EnvoyerReponseDefiUsecase {
  constructor(
    private readonly defiRepository: DefiRepository,
    private readonly eventBus: EventBus<ToDoListEvent>,
  ) {}

  async execute(utilisateurId: string, defiId: string, reponse: string, explication: string): Promise<void> {
    await this.defiRepository.envoyerReponse(
      utilisateurId,
      defiId,
      reponse,
      reponse === 'pas_envie' || reponse === 'abondon' ? explication : undefined,
    );
    this.eventBus.publish(ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
  }
}
