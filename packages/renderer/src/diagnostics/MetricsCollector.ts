export interface RenderMetric {
  renderTime: number;
  hydrationTime?: number;
  nodeCount: number;
  componentCount: number;
  assetCount: number;
}

export class MetricsCollector {
  private metrics: RenderMetric[] = [];

  record(metric: RenderMetric): void {
    this.metrics.push(metric);
  }

  getAverageRenderTime(): number {
    if (this.metrics.length === 0) return 0;
    const sum = this.metrics.reduce((acc, m) => acc + m.renderTime, 0);
    return sum / this.metrics.length;
  }

  getMetrics(): RenderMetric[] {
    return [...this.metrics];
  }

  clear(): void {
    this.metrics = [];
  }
}
