import { BlockContext } from "./BlockContext";
import { BlockManifest } from "../contracts/BlockManifest";
import { BlockLifecycle } from "./BlockLifecycle";
import { ComponentResolver } from "../composition/ComponentResolver";
import { BlockValidator } from "../runtime/BlockValidator";
import { Result, Ok, Err } from "@klin/core";

export class BlockInstance {
  readonly manifest: BlockManifest;
  readonly lifecycle = new BlockLifecycle();
  readonly context: BlockContext;
  private props: Record<string, any> = {};

  constructor(manifest: BlockManifest, context: BlockContext) {
    this.manifest = manifest;
    this.context = context;
  }

  getProperties(): Record<string, any> {
    return this.props;
  }

  updateProperties(newProps: Record<string, any>) {
    this.props = { ...this.props, ...newProps };
    this.context.eventBus.getPublisher().publish("block.updated", { blockId: this.manifest.id, properties: this.props }, "blocks");
  }
}

export class BlockFactory {
  private context: BlockContext;
  private resolver: ComponentResolver;
  private validator = new BlockValidator();

  constructor(context: BlockContext) {
    this.context = context;
    this.resolver = new ComponentResolver(context.registry);
  }

  async createBlock(manifest: BlockManifest, initialProps: Record<string, any> = {}): Promise<Result<BlockInstance, Error>> {
    const instance = new BlockInstance(manifest, this.context);
    instance.lifecycle.transitionTo("Loading");

    // 1. Resolve Required components dependencies
    if (manifest.requiredComponents && manifest.requiredComponents.length > 0) {
      instance.lifecycle.transitionTo("Resolving Components");
      const depRes = await this.resolver.validateDependencies(manifest.requiredComponents);
      if (!depRes.ok) {
        return new Err(depRes.error);
      }
    }

    // 2. Validate Properties Schema
    instance.lifecycle.transitionTo("Validating");
    const valRes = this.validator.validate(initialProps, manifest);
    if (!valRes.ok) {
      return new Err(valRes.error);
    }

    instance.updateProperties(initialProps);
    instance.lifecycle.transitionTo("Ready" as any); // Mount ready transition

    this.context.eventBus.getPublisher().publish("block.loaded", { blockId: manifest.id }, "blocks");
    return new Ok(instance);
  }
}
