import { EventBus } from '@/shell/eventBus';

export enum ThematiqueEvent {
  OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
}

export class ThematiqueEventBusImpl extends EventBus<ThematiqueEvent> {
  private static instance: ThematiqueEventBusImpl | null = null;

  protected eventSubscribers: Record<ThematiqueEvent, { subscriberName: string; callback: () => void }[]> = {
    [ThematiqueEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE]: [],
  };
  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ThematiqueEventBusImpl();
    }
    return this.instance;
  }
}
