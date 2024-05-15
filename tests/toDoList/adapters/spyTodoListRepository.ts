import { ToDoListRepository } from '@/domaines/toDoList/ports/toDoList.repository';
import { TodoList } from '@/domaines/toDoList/recupererToDoList.usecase';

export class SpyToDoListRepository implements ToDoListRepository {
  get recupererToDoListAEteAppele(): boolean {
    return this._recupererToDoListAEteAppele;
  }

  get terminerToDoAEteAppele(): boolean {
    return this._terminerToDoAEteAppele;
  }

  private _recupererToDoListAEteAppele: boolean = false;
  private _terminerToDoAEteAppele: boolean = false;

  recupererToDoList(_idUtilisateur: string): Promise<TodoList> {
    throw new Error('Method not implemented.');
  }

  terminerToDo(_idUtilisateur: string): Promise<void> {
    this._terminerToDoAEteAppele = true;
    return Promise.resolve();
  }

  recupererPointsToDo(_idUtilisateur: string, _elementId: string): Promise<void> {
    this._recupererToDoListAEteAppele = true;
    return Promise.resolve();
  }
}
