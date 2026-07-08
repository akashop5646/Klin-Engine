export class Warehouse {
  public id: string;
  public name: string;
  public location: string;

  constructor(id: string, name: string, location: string) {
    this.id = id;
    this.name = name;
    this.location = location;
  }
}
