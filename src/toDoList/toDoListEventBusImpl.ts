import { EventBus } from '@/shell/eventBus';

export enum ToDoListEvent {
  TODO_POINTS_ONT_ETE_RECUPERE,
  TODO_ARTICLE_A_ETE_LU,
  TODO_A_ETE_TERMINEE,
  TODO_QUIZ_ETE_TERMINE,
}

export class ToDoListEventBusImpl extends EventBus<ToDoListEvent> {
  private static instance: ToDoListEventBusImpl | null = null;

  eventSubscribers: Record<ToDoListEvent, (() => void)[]> = {
    [ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE]: [],
    [ToDoListEvent.TODO_ARTICLE_A_ETE_LU]: [],
    [ToDoListEvent.TODO_A_ETE_TERMINEE]: [],
    [ToDoListEvent.TODO_QUIZ_ETE_TERMINE]: [],
  };
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ToDoListEventBusImpl();
    }
    return this.instance;
  }
}
