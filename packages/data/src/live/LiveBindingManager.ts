import { BindingEngine } from "../binding/BindingEngine";

export class LiveBindingManager {
  private readonly _bindingEngine: BindingEngine;
  private _activeSubscriptions: Map<string, Array<() => void>> = new Map();

  constructor(bindingEngine: BindingEngine) {
    this._bindingEngine = bindingEngine;
  }

  public registerBlockBinding(blockId: string, path: string, callback: (val: any) => void): void {
    const unsubscribe = this._bindingEngine.bind(path, callback);
    if (!this._activeSubscriptions.has(blockId)) {
      this._activeSubscriptions.set(blockId, []);
    }
    this._activeSubscriptions.get(blockId)!.push(unsubscribe);
  }

  public unregisterBlockBindings(blockId: string): void {
    const unsubscribers = this._activeSubscriptions.get(blockId);
    if (unsubscribers) {
      unsubscribers.forEach((unsub) => unsub());
      this._activeSubscriptions.delete(blockId);
    }
  }

  public handleDatabaseChange(collectionName: string, id: string, updatedFields: Record<string, any>): void {
    // Notify binding paths, e.g. collectionName.id.fieldName or relative paths
    Object.keys(updatedFields).forEach((key) => {
      const val = updatedFields[key];
      // Trigger updates for direct fields path references: product.title or settings.social.instagram etc.
      this._bindingEngine.triggerUpdate(`${collectionName}.${key}`, val);
      this._bindingEngine.triggerUpdate(`${collectionName}.${id}.${key}`, val);
    });
  }
}
