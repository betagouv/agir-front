import { TodoList } from '@/domaines/toDoList/recupererToDoList.usecase';

export interface ToDoListPresenter {
  presente(toDoList: TodoList): void;
}
