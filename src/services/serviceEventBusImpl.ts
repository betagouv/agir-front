import { EventBus } from '@/shell/eventBus';

export enum ServiceEvent {
  SERVICE_SUPPRIME,
  SERVICE_INSTALLE,
}

export class ServiceEventBusImpl extends EventBus<ServiceEvent> {
  private static instance: ServiceEventBusImpl | null = null;
  eventSubscribers: Record<ServiceEvent, { subscriberName: string; callback: () => void }[]> = {
    [ServiceEvent.SERVICE_SUPPRIME]: [],
    [ServiceEvent.SERVICE_INSTALLE]: [],
  };

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ServiceEventBusImpl();
    }
    return this.instance;
  }
}

export class ServiceEventBus {}
