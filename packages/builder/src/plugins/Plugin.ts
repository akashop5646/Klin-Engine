export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  entryScriptUrl: string;
  dependencies?: string[];
}

export class Plugin {
  public manifest: PluginManifest;

  constructor(manifest: PluginManifest) {
    this.manifest = manifest;
  }
}
