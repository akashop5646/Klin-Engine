import { RendererLifecycle } from "./RendererLifecycle";
import { RendererConfig } from "./RendererConfig";
import { FeatureFlags } from "./FeatureFlags";

export class RendererEngine {
  private readonly _lifecycle: RendererLifecycle = new RendererLifecycle();
  private readonly _config: RendererConfig;
  private readonly _features: FeatureFlags;

  constructor(config: RendererConfig, features: FeatureFlags) {
    this._config = config;
    this._features = features;
  }

  public get lifecycle(): RendererLifecycle {
    return this._lifecycle;
  }

  public get config(): RendererConfig {
    return this._config;
  }

  public get features(): FeatureFlags {
    return this._features;
  }

  public readonly name = "renderer";

  public async initialize(): Promise<void> {
    this._lifecycle.transitionTo("Initializing");
    this._lifecycle.transitionTo("Resolving Components");
    this._lifecycle.transitionTo("Resolving Theme");
    this._lifecycle.transitionTo("Resolving Assets");
    this._lifecycle.transitionTo("Rendering");
    this._lifecycle.transitionTo("Completed");
  }

  public async start(): Promise<void> {}
  public async stop(): Promise<void> {}
  public async dispose(): Promise<void> {}
}
