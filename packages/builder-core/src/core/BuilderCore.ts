import { Registry } from "@klin/registry";
import { EventBus } from "@klin/event-bus";
import { CommandEngine } from "@klin/command-engine";
import { ThemeEngine } from "@klin/theme";

import { BuilderContainer } from "./BuilderContainer";
import { BuilderLifecycle } from "./BuilderLifecycle";
import { BuilderKernel } from "./BuilderKernel";
import { BuilderAPI } from "../api/BuilderAPI";
import { Result, Ok } from "@klin/core";

export class BuilderCore {
  private container = new BuilderContainer();
  private lifecycle = new BuilderLifecycle();
  private kernel = new BuilderKernel(this.container, this.lifecycle);
  private apiInstance!: BuilderAPI;

  async initialize(dependencies: {
    registry: Registry;
    eventBus: EventBus;
    commandEngine: CommandEngine;
    themeEngine: ThemeEngine;
  }): Promise<Result<void, Error>> {
    await this.kernel.boot(dependencies);
    this.apiInstance = new BuilderAPI(this.container);
    this.lifecycle.transitionTo("Ready");
    return new Ok<void, Error>(undefined);
  }

  get api(): BuilderAPI {
    return this.apiInstance;
  }

  get store() {
    return this.container.store;
  }

  get lifecycleState() {
    return this.lifecycle.getState();
  }

  async destroy(): Promise<void> {
    await this.kernel.shutdown();
  }
}
