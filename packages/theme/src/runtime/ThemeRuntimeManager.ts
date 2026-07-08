import { ThemeRuntimeInstance } from "./ThemeRuntimeInstance";
import { ThemeContext } from "../context/ThemeContext";
import { ThemeHookManager } from "../hooks";

export class ThemeRuntimeManager {
  private instances = new Map<string, ThemeRuntimeInstance>();
  private hooks: ThemeHookManager;

  constructor(hooks: ThemeHookManager) {
    this.hooks = hooks;
  }

  createInstance(context: ThemeContext): ThemeRuntimeInstance {
    const instance = new ThemeRuntimeInstance(context, this.hooks);
    this.instances.set(context.scope, instance);
    return instance;
  }

  getInstance(scope: string): ThemeRuntimeInstance | undefined {
    return this.instances.get(scope);
  }

  listScopes(): string[] {
    return Array.from(this.instances.keys());
  }
}
