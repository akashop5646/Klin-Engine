export class HotReload {
  public triggerUpdate(modulePath: string): void {
    console.log(`[HMR] Triggering hot reload update for: ${modulePath}`);
  }
}
