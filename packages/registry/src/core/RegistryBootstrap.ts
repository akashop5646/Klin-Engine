import { RegistryEngine } from "./RegistryEngine";

export class RegistryBootstrap {
  private engine: RegistryEngine;

  constructor(engine: RegistryEngine) {
    this.engine = engine;
  }

  async initialize() {
    this.engine.lifecycle.transitionTo("Initializing");
    this.engine.lifecycle.transitionTo("Loading");
    this.engine.lifecycle.transitionTo("Ready");

    if (this.engine.context.eventBus) {
      await this.engine.context.eventBus
        .getPublisher()
        .publish("registry.initialized", { status: "success" }, "registry");
    }
  }

  async shutdown() {
    this.engine.lifecycle.transitionTo("Stopped");
  }
}
