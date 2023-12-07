import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { ServiceEvent } from '@/services/serviceEventBusImpl';

export abstract class EventBus<T extends ToDoListEvent | ServiceEvent> {
  protected abstract eventSubscribers: Record<T, (() => void)[]>;
  publish(eventName: T): void {
    const subscribers = this.eventSubscribers[eventName] || [];
    subscribers.forEach(callback => callback());
  }

  subscribe(eventName: T, callback: () => void) {
    if (!this.eventSubscribers[eventName]) {
      this.eventSubscribers[eventName] = [];
    }
    this.eventSubscribers[eventName].push(callback);
  }

  unsubscribe(eventName: T) {
    this.eventSubscribers[eventName] = [];
  }
}
