import { BlueprintNode } from "./ComponentBlueprint";

export class ReusableComponent {
  public id: string;
  public name: string;
  public layoutNode: BlueprintNode;

  constructor(id: string, name: string, layoutNode: BlueprintNode) {
    this.id = id;
    this.name = name;
    this.layoutNode = layoutNode;
  }
}
