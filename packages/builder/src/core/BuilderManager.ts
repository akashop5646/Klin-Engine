import { BuilderContext } from "./BuilderContext";
import { BuilderEngine } from "./BuilderEngine";

export class BuilderManager {
  private readonly _engine: BuilderEngine;

  constructor(engine: BuilderEngine) {
    this._engine = engine;
  }

  public async openWebsite(websiteId: string, templateId?: string): Promise<void> {
    const ctx = new BuilderContext({
      websiteId,
      templateId,
    });
    await this._engine.boot(ctx);
  }

  public async closeWebsite(): Promise<void> {
    await this._engine.shutdown();
  }

  public async openPage(pageId: string): Promise<void> {
    if (this._engine.context) {
      this._engine.context.activePageId = pageId;
    }
  }

  public save(): void {
    this._engine.lifecycle.transitionTo("Saving");
    // Mock save delay
    setTimeout(() => {
      this._engine.lifecycle.transitionTo("Editing");
    }, 500);
  }

  public publish(): void {
    this._engine.lifecycle.transitionTo("Publishing");
    // Mock publish delay
    setTimeout(() => {
      this._engine.lifecycle.transitionTo("Editing");
    }, 1000);
  }
}
