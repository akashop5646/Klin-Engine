import { Entry } from "../entities/Entry";

export class RecycleBin {
  private _bin: Map<string, Entry> = new Map();

  public moveToBin(entry: Entry): void {
    entry.status = "Deleted" as any; // soft delete status
    this._bin.set(entry.id, entry);
  }

  public getTrashed(): Entry[] {
    return Array.from(this._bin.values());
  }

  public restore(id: string): Entry | null {
    const entry = this._bin.get(id);
    if (entry) {
      entry.status = "Draft"; // reset status
      this._bin.delete(id);
      return entry;
    }
    return null;
  }

  public purge(id: string): void {
    this._bin.delete(id);
  }
}
