import { TodoList } from '@/toDoList/recupererToDoList.usecase';

export interface ToDoListRepository {
  recupererToDoList(idUtilisateur: string): Promise<TodoList>;
}
