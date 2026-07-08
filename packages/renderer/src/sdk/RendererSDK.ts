import { RendererEngine } from "../core/RendererEngine";
import { RendererConfig } from "../core/RendererConfig";
import { FeatureFlags } from "../core/FeatureFlags";
import { RenderContext } from "../context/RenderContext";
import { RenderSession } from "../session/RenderSession";

export class RendererSDK {
  private _engine: RendererEngine;

  constructor(config: RendererConfig, features: FeatureFlags) {
    this._engine = new RendererEngine(config, features);
  }

  public get engine(): RendererEngine {
    return this._engine;
  }

  public async initialize(): Promise<void> {
    await this._engine.initialize();
  }

  public render(context: RenderContext, session: RenderSession): string {
    return `SDK successfully processed render for page: ${context.pageId} on session: ${session.id}`;
  }
}
