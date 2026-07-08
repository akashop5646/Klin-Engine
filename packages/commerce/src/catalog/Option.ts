import { OptionValue } from "./OptionValue";

export class Option {
  public id: string;
  public name: string;
  public values: OptionValue[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
