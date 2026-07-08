import { ThemeContext } from "../context/ThemeContext";
import { ThemeCompiler } from "../compiler/ThemeCompiler";
import { CSSVariablesAdapter } from "../adapters";
import { ThemeHookManager } from "../hooks";

export class ThemeRuntimeInstance {
  readonly context: ThemeContext;
  private compiler = new ThemeCompiler();
  private adapter = new CSSVariablesAdapter();
  private hooks: ThemeHookManager;
  private currentCSS = "";

  constructor(context: ThemeContext, hooks: ThemeHookManager) {
    this.context = context;
    this.hooks = hooks;
  }

  async apply(theme: any): Promise<string> {
    await this.hooks.triggerBeforeCompile(theme);
    const variables = this.compiler.compile(theme);
    await this.hooks.triggerAfterCompile(theme, variables);

    await this.hooks.triggerBeforeApply(this.context.scope);
    this.currentCSS = this.adapter.generate(variables, this.context.scope);
    await this.hooks.triggerAfterApply(this.context.scope);

    if (this.context.eventBus) {
      await this.context.eventBus.getPublisher().publish(
        "theme.applied",
        { themeId: this.context.themeId, scope: this.context.scope },
        "theme-engine"
      );
    }

    return this.currentCSS;
  }

  getCurrentCSS(): string {
    return this.currentCSS;
  }
}
