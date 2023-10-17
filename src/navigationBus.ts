import { Router } from 'vue-router';

export enum EventBusEvents {
  SESSION_EXPIREE,
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
  on(eventName: EventBusEvents) {
    if (eventName === EventBusEvents.SESSION_EXPIREE) {
      return this.router?.push({ name: 'session-expiree' });
    }
  }
}
