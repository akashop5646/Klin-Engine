import { SecretProvider } from "./SecretProvider";

export class SecretManager {
  private _provider: SecretProvider;

  constructor(provider: SecretProvider) {
    this._provider = provider;
  }

  public async getSecret(key: string): Promise<string | undefined> {
    return await this._provider.getSecret(key);
  }
}
