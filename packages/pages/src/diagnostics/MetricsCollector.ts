export interface PerformanceMetric {
  name: string;
  durationMs: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export class MetricsCollector {
  private metrics: PerformanceMetric[] = [];

  startMetric(name: string): () => void {
    const start = performance.now();
    return (metadata?: Record<string, unknown>) => {
      const end = performance.now();
      this.metrics.push({
        name,
        durationMs: end - start,
        timestamp: Date.now(),
        metadata,
      });
    };
  }

  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter((m) => m.name === name);
    }
    return this.metrics;
  }

  getAverageDuration(name: string): number {
    const filtered = this.getMetrics(name);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, m) => acc + m.durationMs, 0);
    return sum / filtered.length;
  }

  clearMetrics() {
    this.metrics = [];
  }
}
