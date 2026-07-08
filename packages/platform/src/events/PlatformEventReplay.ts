import { PlatformEventStore } from "./PlatformEventStore";

export class PlatformEventReplay {
  private _store: PlatformEventStore;

  constructor(store: PlatformEventStore) {
    this._store = store;
  }

  public async replayAll(handler: (event: any) => Promise<void>): Promise<void> {
    const events = this._store.getEvents();
    for (const ev of events) {
      await handler(ev);
    }
  }
}
