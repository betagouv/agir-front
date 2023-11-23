import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { TodoList } from '@/toDoList/recupererToDoList.usecase';

export class SpyToDoListRepository implements ToDoListRepository {
  get recupererToDoListAEteAppele(): boolean {
    return this._recupererToDoListAEteAppele;
  }

  private _recupererToDoListAEteAppele: boolean = false;

  recupererToDoList(_idUtilisateur: string): Promise<TodoList> {
    throw new Error('Method not implemented.');
  }

  recupererPointsToDo(_idUtilisateur: string, _elementId: string): Promise<void> {
    this._recupererToDoListAEteAppele = true;
    return Promise.resolve();
  }
}
