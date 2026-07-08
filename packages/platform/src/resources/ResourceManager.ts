import { Resource } from "./Resource";

export class ResourceManager {
  private _resources: Map<string, Resource> = new Map();

  public register(resource: Resource): void {
    this._resources.set(resource.id, resource);
  }

  public get(id: string): Resource | undefined {
    return this._resources.get(id);
  }
}
