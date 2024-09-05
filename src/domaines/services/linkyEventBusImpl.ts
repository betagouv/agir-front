import { EventBus } from '@/shell/eventBus';

export enum LinkyEvent {
  PRM_A_ETE_ENVOYE,
}

export class LinkyEventBusImpl extends EventBus<LinkyEvent> {
  private static instance: LinkyEventBusImpl | null = null;

  protected eventSubscribers: Record<LinkyEvent, { subscriberName: string; callback: () => void }[]> = {
    [LinkyEvent.PRM_A_ETE_ENVOYE]: [],
  };
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new LinkyEventBusImpl();
    }
    return this.instance;
  }
}
