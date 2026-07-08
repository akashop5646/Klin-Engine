export type HookHandler = (...args: any[]) => Promise<void> | void;

export class DevToolsHooks {
  private _hooks: Map<string, Set<HookHandler>> = new Map();

  public register(hookName: string, handler: HookHandler): void {
    if (!this._hooks.has(hookName)) {
      this._hooks.set(hookName, new Set());
    }
    this._hooks.get(hookName)!.add(handler);
  }

  public async trigger(hookName: string, ...args: any[]): Promise<void> {
    const handlers = this._hooks.get(hookName);
    if (handlers) {
      for (const handler of handlers) {
        await handler(...args);
      }
    }
  }
}
