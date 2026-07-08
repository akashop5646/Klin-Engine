import { DataLifecycle } from "./DataLifecycle";
import { DataContext } from "./DataContext";
import { DataSDK } from "../sdk/DataSDK";

export class DataEngine {
  private readonly _lifecycle: DataLifecycle = new DataLifecycle();
  private _context?: DataContext;
  private _sdk?: DataSDK;

  public get lifecycle(): DataLifecycle {
    return this._lifecycle;
  }

  public get context(): DataContext | undefined {
    return this._context;
  }

  public get sdk(): DataSDK | undefined {
    return this._sdk;
  }

  public async initialize(context: DataContext): Promise<void> {
    this._lifecycle.transitionTo("Initializing");
    this._context = context;

    this._lifecycle.transitionTo("LoadingProvider");
    await this._context.provider.connect();

    this._sdk = new DataSDK(this._context);
    this._lifecycle.transitionTo("Ready");
  }

  public readonly name = "data";

  public async start(): Promise<void> {}

  public async shutdown(): Promise<void> {
    if (this._context) {
      await this._context.provider.disconnect();
    }
    this._lifecycle.transitionTo("Disposed");
  }

  public async stop(): Promise<void> {
    await this.shutdown();
  }

  public async dispose(): Promise<void> {}
}
