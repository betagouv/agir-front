import { EventBus } from '@/shell/eventBus';

export enum ActionsEvent {
  A_ETE_REALISEE,
  RESET_VU,
}

export class ActionsEventBus extends EventBus<ActionsEvent> {
  private static instance: ActionsEventBus | null = null;

  protected eventSubscribers: Record<ActionsEvent, { subscriberName: string; callback: () => void }[]> = {
    [ActionsEvent.A_ETE_REALISEE]: [],
    [ActionsEvent.RESET_VU]: [],
  };

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ActionsEventBus();
    }
    return this.instance;
  }
}
