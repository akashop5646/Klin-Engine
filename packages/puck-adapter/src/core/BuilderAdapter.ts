import { Result, Ok } from "@klin/core";
import { IBuilderAdapter } from "./IBuilderAdapter";
import { BuilderContext } from "./BuilderContext";
import { EditorState } from "../state/EditorState";
import { BuilderLifecycle } from "./BuilderLifecycle";
import { Discovery } from "../registry/Discovery";
import { RegistryWatcher } from "../registry/RegistryWatcher";
import { ComponentMapper } from "../mapper/ComponentMapper";
import { ReactRenderer } from "../renderer/ReactRenderer";

export class BuilderAdapter implements IBuilderAdapter {
  private context?: BuilderContext;
  private lifecycle = new BuilderLifecycle();
  private watcher?: RegistryWatcher;
  private puckConfig: any = null;

  async initialize(context: BuilderContext): Promise<Result<void, Error>> {
    this.context = context;
    this.lifecycle.transitionTo("Loading");
    
    // Set up watcher
    this.watcher = new RegistryWatcher(context.eventBus);
    this.watcher.watch(() => {
      this.load();
    });

    this.lifecycle.transitionTo("Loading Components");
    await this.load();

    return new Ok<void, Error>(undefined);
  }

  async load(): Promise<Result<void, Error>> {
    if (!this.context) {
      return new Ok<void, Error>(undefined);
    }
    
    this.lifecycle.transitionTo("Generating Config");
    
    const schemas = Discovery.discoverComponents(this.context.registry);
    const renderer = new ReactRenderer(this.context.registry);

    const components: Record<string, any> = {};
    for (const schema of schemas) {
      components[schema.componentId] = ComponentMapper.map(schema, renderer);
    }

    this.puckConfig = {
      components,
    };

    this.lifecycle.transitionTo("Initializing Canvas");
    this.lifecycle.transitionTo("Ready");

    return new Ok<void, Error>(undefined);
  }

  async registerExtension(extension: any): Promise<Result<void, Error>> {
    return new Ok<void, Error>(undefined);
  }

  updateState(state: Partial<EditorState>): void {}

  getPuckConfig(): any {
    return this.puckConfig;
  }

  async dispose(): Promise<void> {
    if (this.watcher) {
      this.watcher.unwatch();
    }
    this.lifecycle.dispose();
  }
}
