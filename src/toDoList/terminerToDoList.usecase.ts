import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { ToDoListEvent, ToDoListEventBus } from './toDoListEventBusImpl';

export class TerminerToDoListUsecase {
  constructor(private toDoListRepository: ToDoListRepository, private toDoListEventBus: ToDoListEventBus) {}

  async execute(idUtilisateur: string): Promise<void> {
    await this.toDoListRepository.terminerToDo(idUtilisateur);
    this.toDoListEventBus.publish(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
  }
}
