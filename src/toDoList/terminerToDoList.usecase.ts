import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';

export class TerminerToDoListUsecase {
  constructor(private toDoListRepository: ToDoListRepository) {}

  async execute(idUtilisateur: string): Promise<void> {
    await this.toDoListRepository.terminerToDo(idUtilisateur);
  }
}
