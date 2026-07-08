export class Category {
  public id: string;
  public name: string;
  public parentId?: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
