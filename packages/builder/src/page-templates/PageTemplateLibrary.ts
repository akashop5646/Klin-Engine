import { PageTemplate } from "./PageTemplate";

export class PageTemplateLibrary {
  private _templates: PageTemplate[] = [];

  constructor() {
    this.registerDefaults();
  }

  public register(tpl: PageTemplate): void {
    this._templates.push(tpl);
  }

  public getTemplates(): PageTemplate[] {
    return this._templates;
  }

  private registerDefaults(): void {
    this.register(new PageTemplate("landing", "Landing Page", []));
    this.register(new PageTemplate("about", "About Page", []));
    this.register(new PageTemplate("pricing", "Pricing Page", []));
    this.register(new PageTemplate("contact", "Contact Page", []));
  }
}
