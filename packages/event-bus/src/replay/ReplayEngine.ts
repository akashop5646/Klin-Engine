import { EventHistory } from "../history/EventHistory";
import { KlinEvent } from "../events/KlinEvent";

export class ReplayEngine {
  private history: EventHistory;
  private dispatchCallback: (event: KlinEvent) => Promise<void>;

  constructor(history: EventHistory, dispatchCallback: (event: KlinEvent) => Promise<void>) {
    this.history = history;
    this.dispatchCallback = dispatchCallback;
  }

  async replay(count?: number) {
    const records = this.history.getRecords();
    const toReplay = count ? records.slice(-count) : records;
    for (const record of toReplay) {
      await this.dispatchCallback(record.event);
    }
  }

  async replayRange(startOffset: number, endOffset: number) {
    const records = this.history.getRecords();
    const toReplay = records.slice(startOffset, endOffset);
    for (const record of toReplay) {
      await this.dispatchCallback(record.event);
    }
  }
}
