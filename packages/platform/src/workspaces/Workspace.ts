export class Workspace {
  public id: string;
  public name: string;
  public projects: string[] = [];
  public users: string[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
