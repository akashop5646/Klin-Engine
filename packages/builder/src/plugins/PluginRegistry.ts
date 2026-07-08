import { PluginManifest } from "./Plugin";

export class PluginRegistry {
  private _registry: Map<string, PluginManifest> = new Map();

  constructor() {
    this.registerDefaults();
  }

  public register(manifest: PluginManifest): void {
    this._registry.set(manifest.id, manifest);
  }

  public getManifest(id: string): PluginManifest | undefined {
    return this._registry.get(id);
  }

  private registerDefaults(): void {
    this.register({
      id: "google-maps",
      name: "Google Maps widget",
      version: "1.0.0",
      entryScriptUrl: "https://cdn.klin.dev/plugins/google-maps.js",
    });
    this.register({
      id: "stripe-checkout",
      name: "Stripe payments",
      version: "2.1.0",
      entryScriptUrl: "https://cdn.klin.dev/plugins/stripe.js",
    });
  }
}
