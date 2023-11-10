export enum ServiceEvent {
  SERVICE_SUPPRIME,
  SERVICE_INSTALLE,
}

export interface ServiceEventBus {
  publish(eventName: ServiceEvent): void;
  subscribe(eventName: ServiceEvent, callback: () => void): void;
}

export class ServiceEventBusImpl implements ServiceEventBus {
  private static instance: ServiceEventBusImpl | null = null;
  private eventSubscribers: Record<ServiceEvent, (() => void)[]> = {
    [ServiceEvent.SERVICE_SUPPRIME]: [],
    [ServiceEvent.SERVICE_INSTALLE]: [],
  };
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ServiceEventBusImpl();
    }
    return this.instance;
  }

  publish(eventName: ServiceEvent) {
    const subscribers = this.eventSubscribers[eventName] || [];
    subscribers.forEach(callback => callback());
  }

  subscribe(eventName: ServiceEvent, callback: () => void) {
    if (!this.eventSubscribers[eventName]) {
      this.eventSubscribers[eventName] = [];
    }
    this.eventSubscribers[eventName].push(callback);
  }
}
