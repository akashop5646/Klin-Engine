import { SectionTemplate } from "./SectionTemplate";

export class SectionLibrary {
  private _templates: SectionTemplate[] = [];

  public saveSection(template: SectionTemplate): void {
    this._templates.push(template);
  }

  public getSections(): SectionTemplate[] {
    return this._templates;
  }
}
