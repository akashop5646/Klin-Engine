export class CommerceProfiler {
  public profile(name: string, fn: () => void): void {
    const start = Date.now();
    fn();
    console.log(`Profiler: [${name}] took ${Date.now() - start}ms`);
  }
}
