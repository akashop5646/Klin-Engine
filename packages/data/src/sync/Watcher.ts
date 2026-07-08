export class Watcher {
  private _listeners: Set<(event: string, collection: string, data: any) => void> = new Set();

  public subscribe(cb: (event: string, collection: string, data: any) => void): () => void {
    this._listeners.add(cb);
    return () => {
      this._listeners.delete(cb);
    };
  }

  public notify(event: string, collection: string, data: any): void {
    this._listeners.forEach((cb) => cb(event, collection, data));
  }
}
