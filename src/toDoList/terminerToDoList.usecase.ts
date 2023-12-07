import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { ToDoListEvent } from './toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class TerminerToDoListUsecase {
  constructor(private toDoListRepository: ToDoListRepository, private toDoListEventBus: EventBus<ToDoListEvent>) {}

  async execute(idUtilisateur: string): Promise<void> {
    await this.toDoListRepository.terminerToDo(idUtilisateur);
    this.toDoListEventBus.publish(ToDoListEvent.TODO_A_ETE_TERMINEE);
  }
}
