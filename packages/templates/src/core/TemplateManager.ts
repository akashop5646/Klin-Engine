import { TemplateManifest } from "../contracts/TemplateManifest";
import { TemplateInstance, TemplateFactory } from "./TemplateFactory";
import { TemplateContext } from "./TemplateContext";
import { Result, Ok, Err } from "@klin/core";

export class TemplateManager {
  private context: TemplateContext;
  private factory: TemplateFactory;
  private registeredTemplates: Map<string, TemplateManifest> = new Map();
  private instances: Map<string, TemplateInstance> = new Map();

  constructor(context: TemplateContext) {
    this.context = context;
    this.factory = new TemplateFactory(context);
  }

  register(manifest: TemplateManifest): Result<void, Error> {
    this.registeredTemplates.set(manifest.id, manifest);
    return new Ok(undefined);
  }

  unregister(id: string) {
    this.registeredTemplates.delete(id);
  }

  async instantiate(id: string, layout: any[] = []): Promise<Result<TemplateInstance, Error>> {
    const manifest = this.registeredTemplates.get(id);
    if (!manifest) {
      return new Err(new Error(`Template not registered: ${id}`));
    }
    const res = await this.factory.createTemplate(manifest, layout);
    if (res.ok) {
      this.instances.set(id, res.value);
    }
    return res;
  }

  delete(id: string) {
    const instance = this.instances.get(id);
    if (instance) {
      instance.lifecycle.dispose();
      this.instances.delete(id);
      this.context.eventBus.getPublisher().publish("template.deleted", { templateId: id }, "templates");
    }
  }

  list(): TemplateManifest[] {
    return Array.from(this.registeredTemplates.values());
  }
}
