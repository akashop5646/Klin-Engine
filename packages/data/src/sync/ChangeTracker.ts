import { Entry } from "../entities/Entry";

export class ChangeTracker {
  private _drafts: Map<string, string> = new Map(); // entryId -> JSON snapshot

  public track(entry: Entry): void {
    this._drafts.set(entry.id, entry.createSnapshot());
  }

  public isDirty(entry: Entry): boolean {
    const original = this._drafts.get(entry.id);
    if (!original) return false;
    return original !== entry.createSnapshot();
  }

  public getDiff(entry: Entry): Record<string, any> {
    const originalJson = this._drafts.get(entry.id);
    if (!originalJson) return entry.values;

    const original = JSON.parse(originalJson);
    const diff: Record<string, any> = {};

    Object.keys(entry.values).forEach((k) => {
      if (entry.values[k] !== original.values[k]) {
        diff[k] = entry.values[k];
      }
    });

    return diff;
  }

  public clean(entry: Entry): void {
    this._drafts.set(entry.id, entry.createSnapshot());
  }
}
