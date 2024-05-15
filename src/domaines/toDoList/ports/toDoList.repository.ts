import { TodoList } from '@/domaines/toDoList/recupererToDoList.usecase';

export interface ToDoListRepository {
  recupererToDoList(idUtilisateur: string): Promise<TodoList>;
  recupererPointsToDo(idUtilisateur: string, elementId: string): Promise<void>;
  terminerToDo(idUtilisateur: string): Promise<void>;
}
