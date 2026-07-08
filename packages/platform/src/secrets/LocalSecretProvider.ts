import { SecretProvider } from "./SecretProvider";

export class LocalSecretProvider implements SecretProvider {
  private _env: Map<string, string> = new Map();

  constructor() {
    this._env.set("CLOUDINARY_API_KEY", "local-key-cloudinary");
  }

  public async getSecret(key: string): Promise<string | undefined> {
    return this._env.get(key);
  }
}
