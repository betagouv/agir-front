import { TodoList } from '@/toDoList/recupererToDoList.usecase';

export interface ToDoListPresenter {
  presente(toDoList: TodoList): void;
}
