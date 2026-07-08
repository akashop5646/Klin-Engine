import { EventHistory } from "../history/EventHistory";

export class Inspector {
  private history: EventHistory;

  constructor(history: EventHistory) {
    this.history = history;
  }

  getMetrics() {
    const records = this.history.getRecords();
    const total = records.length;
    let totalDuration = 0;
    let subscriberDispatches = 0;

    for (const r of records) {
      if (r.duration) totalDuration += r.duration;
      subscriberDispatches += r.subscribersCount;
    }

    return {
      totalEvents: total,
      averageDuration: total ? totalDuration / total : 0,
      subscriberDispatches,
    };
  }
}
