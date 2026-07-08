export interface TemplateMeta {
  name: string;
  layoutPath: string;
}

export class TemplateRegistry {
  private _templates: Map<string, TemplateMeta> = new Map();

  public registerTemplate(template: TemplateMeta): void {
    this._templates.set(template.name, template);
  }

  public getTemplate(name: string): TemplateMeta | undefined {
    return this._templates.get(name);
  }
}
