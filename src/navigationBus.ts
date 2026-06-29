import { Router } from 'vue-router';

export enum EventBusEvents {
  SESSION_EXPIREE,
  ONBOARDING,
}

export class NavigationBus {
  private static instance: NavigationBus | null = null;
  private router: Router | null = null;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new NavigationBus();
    }
    return this.instance;
  }

  public setRouter(router: Router) {
    this.router = router;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on(_: EventBusEvents) {
    // Site décommissionné : aucune navigation automatique
  }
}
