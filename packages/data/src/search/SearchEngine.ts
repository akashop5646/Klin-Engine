import { Entry } from "../entities/Entry";

export class SearchEngine {
  private _index: Map<string, Entry[]> = new Map();

  public index(collectionName: string, entries: Entry[]): void {
    this._index.set(collectionName, entries);
  }

  public search(collectionName: string, queryText: string): Entry[] {
    const list = this._index.get(collectionName) || [];
    if (!queryText.trim()) return list;

    const term = queryText.toLowerCase();
    return list.filter((e) => {
      return Object.values(e.values).some((val) => {
        return typeof val === "string" && val.toLowerCase().includes(term);
      });
    });
  }
}
