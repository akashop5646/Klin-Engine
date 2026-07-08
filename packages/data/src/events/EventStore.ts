export interface DataMutationEvent {
  id: string;
  type: string; // e.g. "entry.created", "entry.updated"
  collection: string;
  resourceId: string;
  payload: any;
  timestamp: Date;
}

export class EventStore {
  private _events: DataMutationEvent[] = [];

  public append(event: Omit<DataMutationEvent, "id" | "timestamp">): DataMutationEvent {
    const fullEvent: DataMutationEvent = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
      ...event,
    };
    this._events.push(fullEvent);
    return fullEvent;
  }

  public getEvents(collection?: string, resourceId?: string): DataMutationEvent[] {
    let filtered = this._events;
    if (collection) {
      filtered = filtered.filter((e) => e.collection === collection);
    }
    if (resourceId) {
      filtered = filtered.filter((e) => e.resourceId === resourceId);
    }
    return filtered;
  }

  public clear(): void {
    this._events = [];
  }
}
