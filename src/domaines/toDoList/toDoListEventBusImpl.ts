import { EventBus } from '@/shell/eventBus';

export enum ToDoListEvent {
  TODO_POINTS_ONT_ETE_RECUPERE,
  TODO_A_ETE_TERMINEE,
  TODO_QUIZ_ETE_TERMINE,
  TODO_KYC_A_ETE_REPONDU,
  TODO_RECOMMANDATION_A_ETE_CLIQUEE,
}

export class ToDoListEventBusImpl extends EventBus<ToDoListEvent> {
  private static instance: ToDoListEventBusImpl | null = null;

  protected eventSubscribers: Record<ToDoListEvent, { subscriberName: string; callback: () => void }[]> = {
    [ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE]: [],
    [ToDoListEvent.TODO_A_ETE_TERMINEE]: [],
    [ToDoListEvent.TODO_QUIZ_ETE_TERMINE]: [],
    [ToDoListEvent.TODO_KYC_A_ETE_REPONDU]: [],
    [ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE]: [],
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
