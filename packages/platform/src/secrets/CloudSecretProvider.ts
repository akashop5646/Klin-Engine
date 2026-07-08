import { SecretProvider } from "./SecretProvider";

export class CloudSecretProvider implements SecretProvider {
  public async getSecret(key: string): Promise<string | undefined> {
    console.log(`CloudSecretProvider loading credential: ${key}`);
    return `cloud-key-${key}`;
  }
}
