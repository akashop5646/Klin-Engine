export class MetricsCollector {
  private timings: Map<string, number> = new Map();

  start(label: string) {
    this.timings.set(label, performance.now());
  }

  stop(label: string): number {
    const start = this.timings.get(label);
    if (!start) return 0;
    const diff = performance.now() - start;
    this.timings.delete(label);
    return diff;
  }
}
