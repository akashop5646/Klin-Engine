import { ThemeContext } from "../context/ThemeContext";
import { ThemeLifecycle } from "./ThemeLifecycle";
import { ThemeCompiler } from "../compiler/ThemeCompiler";
import { TokenResolver } from "../resolver/TokenResolver";
import { ThemeValidator } from "../validation/ThemeValidator";
import { ThemeHookManager } from "../hooks";
import { ThemeRuntimeManager } from "../runtime/ThemeRuntimeManager";
import { ThemeCache } from "../cache";
import { ThemeSerializer } from "../serializer";
import { ThemeDiff } from "../diff";
import { ThemeInspector } from "../inspector";
import { ThemeMetricsCollector } from "../metrics";
import { Result, Ok, Err } from "@klin/core";

export class ThemeEngine {
  readonly lifecycle = new ThemeLifecycle();
  readonly hooks = new ThemeHookManager();
  readonly cache = new ThemeCache();

  readonly compiler = new ThemeCompiler();
  readonly resolver = new TokenResolver();
  readonly validator = new ThemeValidator();
  readonly runtimeManager = new ThemeRuntimeManager(this.hooks);
  readonly serializer = new ThemeSerializer(this.hooks);
  readonly diff = new ThemeDiff();
  readonly inspector = new ThemeInspector(this.cache);
  readonly metrics = new ThemeMetricsCollector();

  private activeTheme: any | null = null;

  public readonly name = "theme";

  async initialize(): Promise<void> {
    this.lifecycle.transitionTo("Initializing");
    this.lifecycle.transitionTo("Ready");
  }

  public async start(): Promise<void> {}
  public async stop(): Promise<void> {}
  public async dispose(): Promise<void> {}

  async load(rawTheme: any): Promise<Result<any, Error>> {
    this.lifecycle.transitionTo("Loading");
    const valRes = this.validator.validate(rawTheme);
    if (!valRes.ok) {
      this.lifecycle.transitionTo("Ready");
      return new Err<any, Error>(valRes.error);
    }
    this.cache.setRaw(rawTheme.metadata.id, rawTheme);
    this.lifecycle.transitionTo("Ready");
    return new Ok<any, Error>(rawTheme);
  }

  async compile(theme: any): Promise<string> {
    this.lifecycle.transitionTo("Compiling");
    const css = this.compiler.compile(theme);
    this.cache.setCompiled(theme.metadata.id, css);
    this.lifecycle.transitionTo("Ready");
    return css;
  }

  async apply(theme: any, context: ThemeContext): Promise<string> {
    const instance = this.runtimeManager.createInstance(context);
    this.activeTheme = theme;
    return instance.apply(theme);
  }

  async switch(newTheme: any, context: ThemeContext): Promise<string> {
    this.lifecycle.transitionTo("Switching");
    const oldThemeId = this.activeTheme ? this.activeTheme.metadata.id : "";
    await this.hooks.triggerBeforeSwitch(oldThemeId, newTheme.metadata.id);

    const css = await this.apply(newTheme, context);

    await this.hooks.triggerAfterSwitch(oldThemeId, newTheme.metadata.id);
    this.metrics.recordSwitch();
    this.lifecycle.transitionTo("Ready");
    return css;
  }

  async serialize(theme: any): Promise<string> {
    return this.serializer.serialize(theme);
  }

  deserialize(json: string): any {
    return this.serializer.deserialize(json);
  }

  reset() {
    this.cache.clear();
    this.activeTheme = null;
  }
}
