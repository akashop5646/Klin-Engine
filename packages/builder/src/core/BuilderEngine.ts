import { BuilderLifecycle } from "./BuilderLifecycle";
import { BuilderContext } from "./BuilderContext";

export class BuilderEngine {
  private readonly _lifecycle: BuilderLifecycle = new BuilderLifecycle();
  private _context?: BuilderContext;

  public get lifecycle(): BuilderLifecycle {
    return this._lifecycle;
  }

  public get context(): BuilderContext | undefined {
    return this._context;
  }

  public async boot(context: BuilderContext): Promise<void> {
    this._lifecycle.transitionTo("LoadingWebsite");
    this._context = context;

    this._lifecycle.transitionTo("LoadingTheme");
    this._lifecycle.transitionTo("LoadingPages");
    this._lifecycle.transitionTo("LoadingData");
    this._lifecycle.transitionTo("LoadingAssets");
    this._lifecycle.transitionTo("InitializingCanvas");

    this._lifecycle.transitionTo("Ready");
  }

  public readonly name = "builder";

  public async initialize(): Promise<void> {}
  public async start(): Promise<void> {}

  public async shutdown(): Promise<void> {
    this._lifecycle.transitionTo("Disposed");
  }

  public async stop(): Promise<void> {
    await this.shutdown();
  }

  public async dispose(): Promise<void> {}
}
