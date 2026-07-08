import { KlinConfig } from "../types/core";

class KlinStateManager {
  private config: KlinConfig = {
    env: "development",
    apiBaseUrl: "/api",
    debug: true,
  };

  public init(customConfig: Partial<KlinConfig>): void {
    this.config = {
      ...this.config,
      ...customConfig,
    };
    if (this.config.debug) {
      console.log("[KlinState] Core configuration initialized:", this.config);
    }
  }

  public getConfig(): KlinConfig {
    return this.config;
  }
}

export const state = new KlinStateManager();
