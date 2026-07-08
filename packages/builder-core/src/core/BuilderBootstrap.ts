import { BuilderCore } from "./BuilderCore";
import { Registry } from "@klin/registry";
import { EventBus } from "@klin/event-bus";
import { CommandEngine } from "@klin/command-engine";
import { ThemeEngine } from "@klin/theme";

export class BuilderBootstrap {
  static async bootstrap(dependencies: {
    registry: Registry;
    eventBus: EventBus;
    commandEngine: CommandEngine;
    themeEngine: ThemeEngine;
  }): Promise<BuilderCore> {
    const core = new BuilderCore();
    await core.initialize(dependencies);
    return core;
  }
}
