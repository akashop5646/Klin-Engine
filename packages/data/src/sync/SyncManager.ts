import { DataContext } from "../core/DataContext";
import { Entry } from "../entities/Entry";
import { ChangeTracker } from "./ChangeTracker";

export class SyncManager {
  private readonly _context: DataContext;
  private readonly _tracker: ChangeTracker;

  constructor(context: DataContext, tracker: ChangeTracker) {
    this._context = context;
    this._tracker = tracker;
  }

  public async sync(entry: Entry): Promise<void> {
    if (!this._tracker.isDirty(entry)) return;

    const diff = this._tracker.getDiff(entry);
    const payload = {
      values: entry.values,
      localizations: entry.localizations,
      status: entry.status,
      updatedAt: new Date(),
    };

    await this._context.provider.updateEntry(entry.collectionName, entry.id, payload);
    this._tracker.clean(entry);
  }
}
