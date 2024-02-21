import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { ServiceEvent } from '@/services/serviceEventBusImpl';

export abstract class EventBus<T extends ToDoListEvent | ServiceEvent> {
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

  unsubscribe(subscriberName: string, eventName: T) {
    this.eventSubscribers[eventName] = this.eventSubscribers[eventName].filter(
      subscriber => subscriber.subscriberName !== subscriberName
    );
  }
}
