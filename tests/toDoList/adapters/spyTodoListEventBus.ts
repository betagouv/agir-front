import { ToDoListEvent, ToDoListEventBus } from '@/toDoList/toDoListEventBusImpl';

export class SpyToDoListEventBus implements ToDoListEventBus {
  get eventName(): ToDoListEvent | null {
    return this._eventName;
  }
  private _eventName: ToDoListEvent | null = null;

  publish(eventName: ToDoListEvent): void {
    this._eventName = eventName;
  }

  subscribe(eventName: ToDoListEvent, callback: () => void): void {}
}
