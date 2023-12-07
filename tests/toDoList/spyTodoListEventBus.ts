import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class SpyToDoListEventBus extends EventBus<ToDoListEvent> {
  get eventName(): ToDoListEvent | null {
    return this._eventName;
  }
  private _eventName: ToDoListEvent | null = null;

  publish(eventName: ToDoListEvent): void {
    super.publish(eventName);
    this._eventName = eventName;
  }

  eventSubscribers: Record<ToDoListEvent, (() => void)[]> = {
    [ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE]: [],
    [ToDoListEvent.TODO_ARTICLE_A_ETE_LU]: [],
    [ToDoListEvent.TODO_A_ETE_TERMINEE]: [],
    [ToDoListEvent.TODO_QUIZ_ETE_TERMINE]: [],
  };
}
