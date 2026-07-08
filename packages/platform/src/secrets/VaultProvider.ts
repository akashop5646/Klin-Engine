import { SecretProvider } from "./SecretProvider";

export class VaultProvider implements SecretProvider {
  public async getSecret(key: string): Promise<string | undefined> {
    console.log(`VaultProvider fetching key: ${key}`);
    return `vault-secret-for-${key}`;
  }
}
