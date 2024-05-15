import { EventBus } from '@/shell/eventBus';

export enum ToDoListEvent {
  TODO_POINTS_ONT_ETE_RECUPERE,
  TODO_ARTICLE_A_ETE_LU,
  TODO_A_ETE_TERMINEE,
  TODO_QUIZ_ETE_TERMINE,
  TODO_KYC_A_ETE_REPONDU,
  TODO_RECOMMANDATION_A_ETE_CLIQUEE,
  TODO_LINKY_A_ETE_CONSULTE,
}

export class ToDoListEventBusImpl extends EventBus<ToDoListEvent> {
  private static instance: ToDoListEventBusImpl | null = null;

  protected eventSubscribers: Record<ToDoListEvent, { subscriberName: string; callback: () => void }[]> = {
    [ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE]: [],
    [ToDoListEvent.TODO_ARTICLE_A_ETE_LU]: [],
    [ToDoListEvent.TODO_A_ETE_TERMINEE]: [],
    [ToDoListEvent.TODO_QUIZ_ETE_TERMINE]: [],
    [ToDoListEvent.TODO_KYC_A_ETE_REPONDU]: [],
    [ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE]: [],
    [ToDoListEvent.TODO_LINKY_A_ETE_CONSULTE]: [],
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
