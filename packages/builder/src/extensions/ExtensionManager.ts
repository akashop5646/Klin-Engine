import { Extension } from "./Extension";

export class ExtensionManager {
  private _extensions: Map<string, Extension> = new Map();

  public register(ext: Extension): void {
    this._extensions.set(ext.id, ext);
  }

  public getExtensions(): Extension[] {
    return Array.from(this._extensions.values());
  }
}
