import { BlueprintNode } from "../components/ComponentBlueprint";

export class SectionTemplate {
  public id: string;
  public label: string;
  public rootNode: BlueprintNode;

  constructor(id: string, label: string, rootNode: BlueprintNode) {
    this.id = id;
    this.label = label;
    this.rootNode = rootNode;
  }
}
