export interface BlueprintNode {
  type: string;
  props: Record<string, any>;
  children?: BlueprintNode[];
}

export class ComponentBlueprint {
  public readonly id: string;
  public readonly name: string;
  public readonly rootNode: BlueprintNode;

  constructor(id: string, name: string, rootNode: BlueprintNode) {
    this.id = id;
    this.name = name;
    this.rootNode = rootNode;
  }
}
