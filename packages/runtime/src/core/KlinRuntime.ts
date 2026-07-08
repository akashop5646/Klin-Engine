import { RuntimeConfig } from "./RuntimeConfig";
import { RuntimeLifecycle } from "./RuntimeLifecycle";
import { RuntimeContainer } from "./RuntimeContainer";
import { RuntimeLoader } from "./RuntimeLoader";
import { EngineRegistry } from "../registry/EngineRegistry";
import { PluginRegistry } from "../registry/PluginRegistry";
import { IEngine } from "./IEngine";

export class KlinRuntime {
  public readonly config: RuntimeConfig;
  public readonly lifecycle = new RuntimeLifecycle();
  public readonly container = new RuntimeContainer();
  public readonly engines = new EngineRegistry();
  public readonly plugins = new PluginRegistry();

  private static instance: KlinRuntime | null = null;

  constructor(config?: RuntimeConfig) {
    this.config = config || new RuntimeConfig();
  }

  public static getInstance(): KlinRuntime {
    if (!KlinRuntime.instance) {
      KlinRuntime.instance = new KlinRuntime();
    }
    return KlinRuntime.instance;
  }

  public register(engine: IEngine & { name: string }): void {
    this.engines.register(engine.name, engine);
  }

  public async initialize(): Promise<void> {
    console.log("[Klin Runtime] Initializing framework systems...");
  }

  public async start(): Promise<void> {
    await this.lifecycle.boot();
    
    // Initialize and start all registered engines
    for (const engine of this.engines.getAll()) {
      if (engine.initialize) {
        await engine.initialize();
      }
      if (engine.start) {
        await engine.start();
      }
    }
    
    // Activate all registered plugins
    for (const plugin of this.plugins.getAll()) {
      if (plugin.onActivate) {
        await plugin.onActivate(this);
      }
    }
    console.log("[Klin Runtime] System STARTED.");
  }

  public async stop(): Promise<void> {
    // Deactivate all plugins
    for (const plugin of this.plugins.getAll()) {
      if (plugin.onDeactivate) {
        await plugin.onDeactivate();
      }
    }

    // Stop and dispose of all registered engines
    for (const engine of this.engines.getAll()) {
      if (engine.stop) {
        await engine.stop();
      }
      if (engine.dispose) {
        await engine.dispose();
      }
    }

    await this.lifecycle.shutdown();
    console.log("[Klin Runtime] System STOPPED.");
  }
}
