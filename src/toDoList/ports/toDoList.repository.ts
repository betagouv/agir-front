import { TodoList } from '@/toDoList/recupererToDoListUsecase';

export interface ToDoListRepository {
  recupererToDoList(idUtilisateur: string): Promise<TodoList>;
}
