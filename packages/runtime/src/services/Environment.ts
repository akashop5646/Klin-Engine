export class Environment {
  public get(key: string): string | undefined {
    return process.env[key];
  }

  public get isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  }

  public get isDevelopment(): boolean {
    return process.env.NODE_ENV !== "production";
  }
}
