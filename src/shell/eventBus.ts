import { ActionsEvent } from '@/domaines/actions/actions.eventbus';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';

export abstract class EventBus<T extends ToDoListEvent | ActionsEvent> {
  protected abstract eventSubscribers: Record<T, { subscriberName: string; callback: () => void }[]>;

  publish(eventName: T): void {
    const subscribers = this.eventSubscribers[eventName] || [];
    subscribers.forEach(subscriber => {
      subscriber.callback();
    });
  }

  subscribe(subscriberName: string, eventName: T, callback: () => void) {
    if (!this.eventSubscribers[eventName]) {
      this.eventSubscribers[eventName] = [];
    }
    this.eventSubscribers[eventName].push({ subscriberName: subscriberName, callback });
  }

  subscribeToAllEvents(subscriberName: string, callback: () => void) {
    for (const eventName in this.eventSubscribers) {
      this.subscribe(subscriberName, eventName as T, callback);
    }
  }

  unsubscribeToAllEvents(subscriberName: string) {
    for (const eventName in this.eventSubscribers) {
      this.eventSubscribers[eventName] = this.eventSubscribers[eventName].filter(
        subscriber => subscriber.subscriberName !== subscriberName,
      );
    }
  }
}
