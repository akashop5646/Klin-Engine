import { BlueprintNode } from "../components/ComponentBlueprint";

export class PageTemplate {
  public id: string;
  public name: string;
  public layoutNodes: BlueprintNode[];

  constructor(id: string, name: string, layoutNodes: BlueprintNode[]) {
    this.id = id;
    this.name = name;
    this.layoutNodes = layoutNodes;
  }
}
