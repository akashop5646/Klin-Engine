export class Project {
  public id: string;
  public name: string;
  public websites: string[] = [];
  public domains: string[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
