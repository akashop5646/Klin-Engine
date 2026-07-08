import { ThemeHookManager } from "../hooks";

export class ThemeSerializer {
  private hooks: ThemeHookManager;

  constructor(hooks: ThemeHookManager) {
    this.hooks = hooks;
  }

  async serialize(theme: any): Promise<string> {
    await this.hooks.triggerBeforeSerialize(theme);
    const json = JSON.stringify(theme, null, 2);
    await this.hooks.triggerAfterSerialize(theme, json);
    return json;
  }

  deserialize(json: string): any {
    return JSON.parse(json);
  }
}
