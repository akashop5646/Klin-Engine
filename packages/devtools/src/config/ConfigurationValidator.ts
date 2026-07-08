import { ConfigurationSchema } from "./ConfigurationSchema";

export class ConfigurationValidator {
  public validateConfig(config: ConfigurationSchema): boolean {
    return config.projectName.length > 0;
  }
}
