import { EventBus } from '@/shell/eventBus';

export enum MissionEvent {
  OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
  MISSION_TERMINEE,
}

export class MissionEventBusImpl extends EventBus<MissionEvent> {
  private static instance: MissionEventBusImpl | null = null;

  protected eventSubscribers: Record<MissionEvent, { subscriberName: string; callback: () => void }[]> = {
    [MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE]: [],
    [MissionEvent.MISSION_TERMINEE]: [],
  };
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MissionEventBusImpl();
    }
    return this.instance;
  }
}
