export class MetricsCollector {
  private timings: Map<string, number> = new Map();
  private counters: Map<string, number> = new Map();

  startTiming(name: string) {
    this.timings.set(name, performance.now());
  }

  endTiming(name: string): number {
    const start = this.timings.get(name);
    if (start === undefined) return 0;
    const duration = performance.now() - start;
    console.log(`[Metrics] ${name} completed in ${duration.toFixed(2)}ms`);
    return duration;
  }

  incrementCounter(name: string) {
    const current = this.counters.get(name) || 0;
    this.counters.set(name, current + 1);
  }

  getCounter(name: string): number {
    return this.counters.get(name) || 0;
  }
}
