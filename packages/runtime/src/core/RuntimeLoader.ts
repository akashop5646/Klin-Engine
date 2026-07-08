import { RuntimeConfig } from "./RuntimeConfig";

export class RuntimeLoader {
  public async loadConfig(configPath?: string): Promise<RuntimeConfig> {
    return new RuntimeConfig({
      env: process.env.NODE_ENV === "production" ? "production" : "development",
      storageUri: process.env.MONGODB_URI || "mongodb://localhost:27017/Kiln",
      configPath: configPath || "./klin.config.json",
    });
  }
}
