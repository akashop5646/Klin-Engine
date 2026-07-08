import { BindingContext } from "./BindingContext";
import { BindingResolver } from "./BindingResolver";
import { BindingExpression } from "./BindingExpression";

export class BindingEngine {
  private _bindings: Map<string, Set<(newValue: any) => void>> = new Map();

  public bind(path: string, callback: (newValue: any) => void): () => void {
    if (!this._bindings.has(path)) {
      this._bindings.set(path, new Set());
    }
    this._bindings.get(path)!.add(callback);
    return () => {
      this._bindings.get(path)?.delete(callback);
    };
  }

  public triggerUpdate(path: string, newValue: any): void {
    const listeners = this._bindings.get(path);
    if (listeners) {
      listeners.forEach((cb) => cb(newValue));
    }
  }

  public resolveProperties(properties: Record<string, any>, context: BindingContext): Record<string, any> {
    const resolved: Record<string, any> = {};
    for (const key of Object.keys(properties)) {
      const val = properties[key];
      if (BindingExpression.isBinding(val)) {
        resolved[key] = BindingResolver.resolve(val, context);
      } else {
        resolved[key] = val;
      }
    }
    return resolved;
  }
}
