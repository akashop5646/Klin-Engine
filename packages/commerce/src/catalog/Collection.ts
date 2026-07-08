export class Collection {
  public id: string;
  public name: string;
  public products: string[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
