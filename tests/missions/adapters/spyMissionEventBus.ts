import { EventBus } from '@/shell/eventBus';
import { MissionEvent } from '@/domaines/missions/missionEventBus.impl';

export class SpyMissionEventBus extends EventBus<MissionEvent> {
  get eventName(): MissionEvent | null {
    return this._eventName;
  }
  private _eventName: MissionEvent | null = null;

  publish(eventName: MissionEvent): void {
    super.publish(eventName);
    this._eventName = eventName;
  }

  eventSubscribers: Record<MissionEvent, { subscriberName: string; callback: () => void }[]> = {
    [MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE]: [],
    [MissionEvent.MISSION_TERMINEE]: [],
  };
}
