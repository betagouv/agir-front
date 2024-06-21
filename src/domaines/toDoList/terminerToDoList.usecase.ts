import { ToDoListEvent } from './toDoListEventBusImpl';
import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { ToDoListRepository } from '@/domaines/toDoList/ports/toDoList.repository';
import { EventBus } from '@/shell/eventBus';

export class TerminerToDoListUsecase {
  constructor(
    private toDoListRepository: ToDoListRepository,
    private sessionRepository: SessionRepository,
    private toDoListEventBus: EventBus<ToDoListEvent>,
  ) {}

  async execute(idUtilisateur: string, featureDebloquee: string): Promise<void> {
    await this.toDoListRepository.terminerToDo(idUtilisateur);
    this.sessionRepository.nouvelleFeatureDebloquee(featureDebloquee);
    this.toDoListEventBus.publish(ToDoListEvent.TODO_A_ETE_TERMINEE);
  }
}
