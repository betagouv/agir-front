import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class SpyToDoListEventBus extends EventBus<ToDoListEvent> {
  eventSubscribers: Record<ToDoListEvent, { subscriberName: string; callback: () => void }[]> = {
    [ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE]: [],
    [ToDoListEvent.TODO_A_ETE_TERMINEE]: [],
    [ToDoListEvent.TODO_QUIZ_ETE_TERMINE]: [],
    [ToDoListEvent.TODO_KYC_A_ETE_REPONDU]: [],
    [ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE]: [],
  };

  private _eventName: ToDoListEvent | null = null;

  get eventName(): ToDoListEvent | null {
    return this._eventName;
  }

  publish(eventName: ToDoListEvent): void {
    super.publish(eventName);
    this._eventName = eventName;
  }
}
