import { EventBus } from '@/shell/eventBus';
import { ThematiqueEvent } from '@/domaines/thematiques/thematiqueEventBusImpl';

export class SpyThematiqueEventBus extends EventBus<ThematiqueEvent> {
  get eventName(): ThematiqueEvent | null {
    return this._eventName;
  }
  private _eventName: ThematiqueEvent | null = null;

  publish(eventName: ThematiqueEvent): void {
    super.publish(eventName);
    this._eventName = eventName;
  }

  eventSubscribers: Record<ThematiqueEvent, { subscriberName: string; callback: () => void }[]> = {
    [ThematiqueEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE]: [],
  };
}
