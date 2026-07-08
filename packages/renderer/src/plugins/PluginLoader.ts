export class PluginLoader {
  public async fetchPluginScript(manifestUrl: string): Promise<string> {
    return `console.log("Mock script bundle pulled from ${manifestUrl}");`;
  }
}
