import { Attribute } from "./Attribute";

export class AttributeSet {
  public id: string;
  public name: string;
  public attributes: Attribute[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
