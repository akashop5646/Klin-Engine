export type RuntimeState = "uninitialized" | "booting" | "ready" | "terminating" | "terminated";

export type LifecycleHook = () => void | Promise<void>;

export class RuntimeLifecycle {
  private _state: RuntimeState = "uninitialized";
  private hooks: Record<string, LifecycleHook[]> = {
    beforeBoot: [],
    afterBoot: [],
    beforeShutdown: [],
    afterShutdown: [],
  };

  public get state(): RuntimeState {
    return this._state;
  }

  public registerHook(stage: keyof typeof this.hooks, hook: LifecycleHook): void {
    this.hooks[stage].push(hook);
  }

  public async boot(): Promise<void> {
    if (this._state !== "uninitialized") {
      throw new Error(`Cannot boot runtime from state: ${this._state}`);
    }

    this._state = "booting";
    await this.runHooks("beforeBoot");
    this._state = "ready";
    await this.runHooks("afterBoot");
  }

  public async shutdown(): Promise<void> {
    if (this._state !== "ready") {
      throw new Error(`Cannot shutdown runtime from state: ${this._state}`);
    }

    this._state = "terminating";
    await this.runHooks("beforeShutdown");
    this._state = "terminated";
    await this.runHooks("afterShutdown");
  }

  private async runHooks(stage: keyof typeof this.hooks): Promise<void> {
    const list = this.hooks[stage];
    for (const hook of list) {
      try {
        await hook();
      } catch (err) {
        console.error(`[Klin Runtime] Hook error during ${stage}:`, err);
      }
    }
  }
}
