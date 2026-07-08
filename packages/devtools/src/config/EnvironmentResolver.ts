export class EnvironmentResolver {
  public resolveEnvironment(): Record<string, string> {
    return {
      NODE_ENV: process.env.NODE_ENV || "development",
      KLIN_ENV: process.env.KLIN_ENV || "development"
    };
  }
}
