import { KlinEvent } from "../events/KlinEvent";

export interface EventRecord {
  event: KlinEvent;
  dispatchedAt?: number;
  completedAt?: number;
  duration?: number;
  subscribersCount: number;
}

export class EventHistory {
  private records: EventRecord[] = [];
  private limit = 1000;

  record(event: KlinEvent, subscribersCount: number) {
    this.records.push({
      event,
      dispatchedAt: event.metadata.dispatchedAt,
      completedAt: event.metadata.completedAt,
      duration: event.metadata.duration,
      subscribersCount,
    });
    if (this.records.length > this.limit) {
      this.records.shift();
    }
  }

  getRecords(): EventRecord[] {
    return [...this.records];
  }

  clear() {
    this.records = [];
  }
}
