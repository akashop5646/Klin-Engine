export class Promotion {
  public id: string;
  public name: string;
  public active: boolean;

  constructor(id: string, name: string, active: boolean = true) {
    this.id = id;
    this.name = name;
    this.active = active;
  }
}
