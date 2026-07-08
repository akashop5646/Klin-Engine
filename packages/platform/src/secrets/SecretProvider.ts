export interface SecretProvider {
  getSecret(key: string): Promise<string | undefined>;
}
