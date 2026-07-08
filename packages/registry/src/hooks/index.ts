export interface RegistryHooks {
  beforeRegister?(item: any): Promise<void> | void;
  afterRegister?(item: any): Promise<void> | void;
  beforeRemove?(id: string): Promise<void> | void;
  afterRemove?(id: string): Promise<void> | void;
  beforeResolve?(id: string): Promise<void> | void;
  afterResolve?(id: string, result: any): Promise<void> | void;
}

export class RegistryHookManager {
  private hooks: RegistryHooks[] = [];

  register(hook: RegistryHooks) {
    this.hooks.push(hook);
  }

  async triggerBeforeRegister(item: any) {
    for (const h of this.hooks) {
      if (h.beforeRegister) await h.beforeRegister(item);
    }
  }

  async triggerAfterRegister(item: any) {
    for (const h of this.hooks) {
      if (h.afterRegister) await h.afterRegister(item);
    }
  }

  async triggerBeforeRemove(id: string) {
    for (const h of this.hooks) {
      if (h.beforeRemove) await h.beforeRemove(id);
    }
  }

  async triggerAfterRemove(id: string) {
    for (const h of this.hooks) {
      if (h.afterRemove) await h.afterRemove(id);
    }
  }

  async triggerBeforeResolve(id: string) {
    for (const h of this.hooks) {
      if (h.beforeResolve) await h.beforeResolve(id);
    }
  }

  async triggerAfterResolve(id: string, result: any) {
    for (const h of this.hooks) {
      if (h.afterResolve) await h.afterResolve(id, result);
    }
  }
}
