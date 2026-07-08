import { TemplateContext } from "./TemplateContext";
import { TemplateManifest } from "../contracts/TemplateManifest";
import { TemplateLifecycle } from "./TemplateLifecycle";
import { BlockResolver } from "../composition/BlockResolver";
import { TemplateValidator } from "../runtime/TemplateValidator";
import { Result, Ok, Err } from "@klin/core";

export class TemplateInstance {
  readonly manifest: TemplateManifest;
  readonly lifecycle = new TemplateLifecycle();
  readonly context: TemplateContext;
  private layout: any[] = [];

  constructor(manifest: TemplateManifest, context: TemplateContext) {
    this.manifest = manifest;
    this.context = context;
  }

  getLayout(): any[] {
    return this.layout;
  }

  updateLayout(newLayout: any[]) {
    this.layout = newLayout;
    this.context.eventBus.getPublisher().publish("template.updated", { templateId: this.manifest.id, layout: this.layout }, "templates");
  }
}

export class TemplateFactory {
  private context: TemplateContext;
  private blockResolver: BlockResolver;
  private validator = new TemplateValidator();

  constructor(context: TemplateContext) {
    this.context = context;
    this.blockResolver = new BlockResolver(context.registry);
  }

  async createTemplate(manifest: TemplateManifest, layout: any[] = []): Promise<Result<TemplateInstance, Error>> {
    const instance = new TemplateInstance(manifest, this.context);
    instance.lifecycle.transitionTo("Loading");

    // 1. Resolve required block dependencies
    if (manifest.requiredBlocks && manifest.requiredBlocks.length > 0) {
      instance.lifecycle.transitionTo("Resolving Blocks");
      const blockRes = await this.blockResolver.validateBlocks(manifest.requiredBlocks);
      if (!blockRes.ok) {
        return new Err(blockRes.error);
      }
    }

    // 2. Validate template schema structure
    instance.lifecycle.transitionTo("Validating");
    const valRes = this.validator.validate(layout, manifest);
    if (!valRes.ok) {
      return new Err(valRes.error);
    }

    instance.updateLayout(layout);
    instance.lifecycle.transitionTo("Ready" as any);

    this.context.eventBus.getPublisher().publish("template.loaded", { templateId: manifest.id }, "templates");
    return new Ok(instance);
  }
}
