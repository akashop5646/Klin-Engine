import { IRenderer } from "../core/IRenderer";

export class RendererRegistry {
  private _registries: Map<string, any> = new Map();
  private _renderers: Map<string, IRenderer> = new Map();
  private _isFrozen: boolean = false;

  public freeze(): void {
    this._isFrozen = true;
  }

  private checkFrozen(): void {
    if (this._isFrozen && process.env.NODE_ENV !== "development") {
      throw new Error("Cannot register items: RendererRegistry has been frozen after initialization.");
    }
  }

  public register(key: string, item: any): void {
    this.checkFrozen();
    this._registries.set(key, item);
  }

  public get(key: string): any {
    return this._registries.get(key);
  }

  public registerRenderer(renderer: IRenderer): void {
    this.checkFrozen();
    this._renderers.set(renderer.id, renderer);
  }

  public removeRenderer(id: string): void {
    this.checkFrozen();
    this._renderers.delete(id);
  }

  public findRenderer(id: string): IRenderer | undefined {
    return this._renderers.get(id);
  }

  public list(): IRenderer[] {
    return Array.from(this._renderers.values());
  }
}
