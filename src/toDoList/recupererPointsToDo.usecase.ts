import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { ToDoListEvent, ToDoListEventBus } from '@/toDoList/toDoListEventBusImpl';

export class RecupererPointsToDoUsecase {
  constructor(private toDoListRepository: ToDoListRepository, private toDoListEventBus: ToDoListEventBus) {}

  async execute(idUtilisateur: string, elementId: string): Promise<void> {
    await this.toDoListRepository.recupererPointsToDo(idUtilisateur, elementId);
    this.toDoListEventBus.publish(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
  }
}
