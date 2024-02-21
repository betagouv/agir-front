import { EventBus } from '@/shell/eventBus';
import { ServiceEvent } from '@/services/serviceEventBusImpl';

export class ServiceEventBusSpy extends EventBus<ServiceEvent> {
  get eventName(): ServiceEvent | null {
    return this._eventName;
  }

  private _eventName: ServiceEvent | null = null;

  publish(eventName: ServiceEvent): void {
    super.publish(eventName);
    this._eventName = eventName;
  }

  eventSubscribers: Record<ServiceEvent, { subscriberName: string; callback: () => void }[]> = {
    [ServiceEvent.SERVICE_SUPPRIME]: [],
    [ServiceEvent.SERVICE_INSTALLE]: [],
  };
}
