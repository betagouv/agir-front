export enum ToDoListEvent {
  TODO_POINTS_ONT_ETE_RECUPERE,
  TODO_ARTICLE_A_ETE_LU,
  TODO_A_ETE_TERMINEE,
  TODO_QUIZ_ETE_TERMINE,
}

export interface ToDoListEventBus {
  publish(eventName: ToDoListEvent): void;
  subscribe(eventName: ToDoListEvent, callback: () => void): void;
}

export class ToDoListEventBusImpl implements ToDoListEventBus {
  private static instance: ToDoListEventBusImpl | null = null;
  private eventSubscribers: Record<ToDoListEvent, (() => void)[]> = {
    [ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE]: [],
    [ToDoListEvent.TODO_ARTICLE_A_ETE_LU]: [],
    [ToDoListEvent.TODO_A_ETE_TERMINEE]: [],
    [ToDoListEvent.TODO_QUIZ_ETE_TERMINE]: [],
  };
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ToDoListEventBusImpl();
    }
    return this.instance;
  }

  publish(eventName: ToDoListEvent) {
    const subscribers = this.eventSubscribers[eventName] || [];
    subscribers.forEach(callback => callback());
  }

  subscribe(eventName: ToDoListEvent, callback: () => void) {
    if (!this.eventSubscribers[eventName]) {
      this.eventSubscribers[eventName] = [];
    }
    this.eventSubscribers[eventName].push(callback);
  }

  unsubscribe(eventName: ToDoListEvent) {
    this.eventSubscribers[eventName] = [];
  }
}
