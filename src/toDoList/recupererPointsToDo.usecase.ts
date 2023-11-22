import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';

export class RecupererPointsToDoUsecase {
  constructor(private toDoListRepository: ToDoListRepository) {}

  async execute(idUtilisateur: string, elementId: string): Promise<void> {
    await this.toDoListRepository.recupererPointsToDo(idUtilisateur, elementId);
  }
}
