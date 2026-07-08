export class RegistryMatcher {
  public matchComponent(name: string): string | undefined {
    const defaultMappings: Record<string, string> = {
      Button: "@klin/blocks/Button",
      Hero: "@klin/blocks/Hero",
      Footer: "@klin/blocks/Footer"
    };
    return defaultMappings[name];
  }
}
