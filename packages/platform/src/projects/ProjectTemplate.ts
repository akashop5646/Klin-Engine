export class ProjectTemplate {
  public templateId: string;
  public name: string;
  public starterPages: string[];

  constructor(templateId: string, name: string, starterPages: string[]) {
    this.templateId = templateId;
    this.name = name;
    this.starterPages = starterPages;
  }
}
