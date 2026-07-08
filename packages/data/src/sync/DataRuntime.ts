import { Entry } from "../entities/Entry";

export class DataRuntime {
  private _activeEntries: Map<string, Entry> = new Map();

  public register(entry: Entry): void {
    this._activeEntries.set(entry.id, entry);
  }

  public get(id: string): Entry | undefined {
    return this._activeEntries.get(id);
  }

  public evict(id: string): void {
    this._activeEntries.delete(id);
  }

  public getActiveEntries(): Entry[] {
    return Array.from(this._activeEntries.values());
  }
}
