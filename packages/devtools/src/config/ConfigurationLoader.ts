export class ConfigurationLoader {
  public async loadConfig(configPath: string): Promise<any> {
    console.log(`Loading TS/JSON configuration variables from: ${configPath}`);
    return { projectName: "KlinApp", version: "1.0.0" };
  }
}
