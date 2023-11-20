import { TodoList } from '@/toDoList/recupererToDoListUsecase';

export interface ToDoListPresenter {
  presente(toDoList: TodoList): void;
}
