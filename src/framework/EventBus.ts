export type EventCallback = (...args: unknown[]) => void;

export interface EmittingEventBus {
  on<T extends EventCallback = EventCallback>(event: string, callback: T): void;

  off<T extends EventCallback = EventCallback>(event: string, callback: T): void;
  emit(event: string, ...args: unknown[]): void;
}

export default class EventBus implements EmittingEventBus {
  private listeners: Record<string, EventCallback[]>;

  constructor() {
    this.listeners = {};
  }

  public on<T extends EventCallback = EventCallback>(event: string, callback: T): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback as EventCallback);
  }

  public off<T extends EventCallback = EventCallback>(event: string, callback: T): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback,
    );
  }

  public emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event] || this.listeners[event].length === 0) {
      return;
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
