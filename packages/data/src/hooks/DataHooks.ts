import { Entry } from "../entities/Entry";

export type DataHookType =
  | "beforeCreate"
  | "afterCreate"
  | "beforeUpdate"
  | "afterUpdate"
  | "beforePublish"
  | "afterPublish"
  | "beforeDelete"
  | "afterDelete";

export class DataHooks {
  private _hooks: Map<DataHookType, Set<(entry: Entry) => Promise<void>>> = new Map();

  public register(type: DataHookType, callback: (entry: Entry) => Promise<void>): () => void {
    if (!this._hooks.has(type)) {
      this._hooks.set(type, new Set());
    }
    this._hooks.get(type)!.add(callback);
    return () => {
      this._hooks.get(type)?.delete(callback);
    };
  }

  public async run(type: DataHookType, entry: Entry): Promise<void> {
    const list = this._hooks.get(type);
    if (list) {
      for (const callback of list) {
        await callback(entry);
      }
    }
  }
}
