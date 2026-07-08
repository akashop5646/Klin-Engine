export class RegistryViewer {
  public viewRegistry(registry: Map<string, any>): void {
    console.log("[RegistryViewer] Registry contents:");
    for (const [key, value] of registry.entries()) {
      console.log(`  ${key}: ${JSON.stringify(value)}`);
    }
  }
}
