import { RegistryEngine } from "./RegistryEngine";
import { RegistryBootstrap } from "./RegistryBootstrap";
import { RegistryContext } from "./RegistryContext";
import { SearchQuery } from "../search";
import { Result } from "@klin/core";

export class Registry {
  private engine: RegistryEngine;
  private bootstrap: RegistryBootstrap;

  constructor(context: RegistryContext) {
    this.engine = new RegistryEngine(context);
    this.bootstrap = new RegistryBootstrap(this.engine);
  }

  async initialize() {
    await this.bootstrap.initialize();
  }

  async shutdown() {
    await this.bootstrap.shutdown();
  }

  async register(rawManifest: any): Promise<Result<void, Error>> {
    return this.engine.registerManifest(rawManifest);
  }

  async resolve(type: string, id: string): Promise<any | undefined> {
    return this.engine.resolve(type, id);
  }

  search(query: SearchQuery): any[] {
    return this.engine.search(query);
  }

  snapshot() {
    return this.engine.takeSnapshot();
  }

  restore(state: any) {
    this.engine.restoreSnapshot(state);
  }

  health() {
    return this.engine.checkHealth();
  }
}
