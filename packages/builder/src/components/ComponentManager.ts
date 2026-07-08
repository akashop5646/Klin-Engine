import { ComponentBlueprint, BlueprintNode } from "./ComponentBlueprint";

export class ComponentManager {
  private _blueprints: Map<string, ComponentBlueprint> = new Map();

  public createBlueprint(name: string, rootNode: BlueprintNode): ComponentBlueprint {
    const id = Math.random().toString(36).substring(2, 9);
    const bp = new ComponentBlueprint(id, name, rootNode);
    this._blueprints.set(id, bp);
    return bp;
  }

  public getBlueprint(id: string): ComponentBlueprint | undefined {
    return this._blueprints.get(id);
  }

  public deleteBlueprint(id: string): void {
    this._blueprints.delete(id);
  }
}
