import { CommerceEvent } from "./CommerceEvents";

export class CommerceEventStore {
  private _events: CommerceEvent[] = [];

  public append(event: CommerceEvent): void {
    this._events.push(event);
  }

  public getEvents(websiteId: string): CommerceEvent[] {
    return this._events.filter((e) => e.websiteId === websiteId);
  }
}
