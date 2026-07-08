export class PriceList {
  public id: string;
  public name: string;
  public rates: Map<string, number> = new Map();

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
