import { ToDoListRepository } from '@/domaines/toDoList/ports/toDoList.repository';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class RecupererPointsToDoUsecase {
  constructor(
    private toDoListRepository: ToDoListRepository,
    private toDoListEventBus: EventBus<ToDoListEvent>,
  ) {}

  async execute(idUtilisateur: string, elementId: string): Promise<void> {
    await this.toDoListRepository.recupererPointsToDo(idUtilisateur, elementId);
    this.toDoListEventBus.publish(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
  }
}
