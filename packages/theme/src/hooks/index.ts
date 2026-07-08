export interface ThemeHooks {
  beforeCompile?(theme: any): Promise<void> | void;
  afterCompile?(theme: any, compiled: string): Promise<void> | void;
  beforeApply?(scope: string): Promise<void> | void;
  afterApply?(scope: string): Promise<void> | void;
  beforeSwitch?(oldThemeId: string, newThemeId: string): Promise<void> | void;
  afterSwitch?(oldThemeId: string, newThemeId: string): Promise<void> | void;
  beforeSerialize?(theme: any): Promise<void> | void;
  afterSerialize?(theme: any, serialized: string): Promise<void> | void;
}

export class ThemeHookManager {
  private hooks: ThemeHooks[] = [];

  register(hook: ThemeHooks) {
    this.hooks.push(hook);
  }

  async triggerBeforeCompile(theme: any) {
    for (const h of this.hooks) {
      if (h.beforeCompile) await h.beforeCompile(theme);
    }
  }

  async triggerAfterCompile(theme: any, compiled: string) {
    for (const h of this.hooks) {
      if (h.afterCompile) await h.afterCompile(theme, compiled);
    }
  }

  async triggerBeforeApply(scope: string) {
    for (const h of this.hooks) {
      if (h.beforeApply) await h.beforeApply(scope);
    }
  }

  async triggerAfterApply(scope: string) {
    for (const h of this.hooks) {
      if (h.afterApply) await h.afterApply(scope);
    }
  }

  async triggerBeforeSwitch(oldThemeId: string, newThemeId: string) {
    for (const h of this.hooks) {
      if (h.beforeSwitch) await h.beforeSwitch(oldThemeId, newThemeId);
    }
  }

  async triggerAfterSwitch(oldThemeId: string, newThemeId: string) {
    for (const h of this.hooks) {
      if (h.afterSwitch) await h.afterSwitch(oldThemeId, newThemeId);
    }
  }

  async triggerBeforeSerialize(theme: any) {
    for (const h of this.hooks) {
      if (h.beforeSerialize) await h.beforeSerialize(theme);
    }
  }

  async triggerAfterSerialize(theme: any, serialized: string) {
    for (const h of this.hooks) {
      if (h.afterSerialize) await h.afterSerialize(theme, serialized);
    }
  }
}
