/**
 * Button Component Hooks — lifecycle extension points for plugins and AI.
 */

export interface ButtonComponentHooks {
  beforeValidate?(props: any): void;
  afterValidate?(props: any, isValid: boolean): void;
  beforeTheme?(themeId: string): void;
  afterTheme?(themeId: string, resolvedTokens: any): void;
  beforeRender?(props: any): void;
  afterRender?(element: any): void;
  beforeUnmount?(): void;
  afterUnmount?(): void;
}

export class ButtonHookManager {
  private hooks: ButtonComponentHooks[] = [];

  register(hook: ButtonComponentHooks): void {
    this.hooks.push(hook);
  }

  async triggerBeforeValidate(props: any): Promise<void> {
    for (const h of this.hooks) {
      if (h.beforeValidate) h.beforeValidate(props);
    }
  }

  async triggerAfterValidate(props: any, isValid: boolean): Promise<void> {
    for (const h of this.hooks) {
      if (h.afterValidate) h.afterValidate(props, isValid);
    }
  }

  async triggerBeforeTheme(themeId: string): Promise<void> {
    for (const h of this.hooks) {
      if (h.beforeTheme) h.beforeTheme(themeId);
    }
  }

  async triggerAfterTheme(themeId: string, resolvedTokens: any): Promise<void> {
    for (const h of this.hooks) {
      if (h.afterTheme) h.afterTheme(themeId, resolvedTokens);
    }
  }

  async triggerBeforeRender(props: any): Promise<void> {
    for (const h of this.hooks) {
      if (h.beforeRender) h.beforeRender(props);
    }
  }

  async triggerAfterRender(element: any): Promise<void> {
    for (const h of this.hooks) {
      if (h.afterRender) h.afterRender(element);
    }
  }

  async triggerBeforeUnmount(): Promise<void> {
    for (const h of this.hooks) {
      if (h.beforeUnmount) h.beforeUnmount();
    }
  }

  async triggerAfterUnmount(): Promise<void> {
    for (const h of this.hooks) {
      if (h.afterUnmount) h.afterUnmount();
    }
  }
}
