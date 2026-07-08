export class PluginSandbox {
  public executeSafely(fn: () => void): void {
    try {
      fn();
    } catch (e) {
      console.error("Plugin sandbox blocked execution error:", e);
    }
  }
}
