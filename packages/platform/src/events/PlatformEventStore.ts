export interface StoredEvent {
  readonly id: string;
  readonly type: string;
  readonly payload: any;
  readonly timestamp: number;
}

export class PlatformEventStore {
  private _events: StoredEvent[] = [];

  public append(type: string, payload: any): void {
    this._events.push({
      id: "ev-" + Math.random().toString(36).substring(2, 9),
      type,
      payload,
      timestamp: Date.now(),
    });
  }

  public getEvents(): StoredEvent[] {
    return this._events;
  }
}
