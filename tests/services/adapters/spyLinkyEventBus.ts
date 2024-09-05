import { LinkyEvent } from '@/domaines/services/linkyEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class SpyLinkyEventBus extends EventBus<LinkyEvent> {
  get eventName(): LinkyEvent | null {
    return this._eventName;
  }
  private _eventName: LinkyEvent | null = null;

  publish(eventName: LinkyEvent): void {
    super.publish(eventName);
    this._eventName = eventName;
  }

  eventSubscribers: Record<LinkyEvent, { subscriberName: string; callback: () => void }[]> = {
    [LinkyEvent.PRM_A_ETE_ENVOYE]: [],
  };
}
