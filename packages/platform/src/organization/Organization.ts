export class Organization {
  public id: string;
  public name: string;
  public ownerId: string;

  constructor(id: string, name: string, ownerId: string) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
  }
}
