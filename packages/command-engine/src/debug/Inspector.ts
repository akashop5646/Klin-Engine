import { MetricsCollector } from "../metrics/MetricsCollector";
import { HistoryManager } from "../history/HistoryManager";

export class Inspector {
  private metrics: MetricsCollector;
  private history: HistoryManager;

  constructor(metrics: MetricsCollector, history: HistoryManager) {
    this.metrics = metrics;
    this.history = history;
  }

  getSummary() {
    return {
      metrics: {
        executed: this.metrics.executedCount,
        failed: this.metrics.failedCount,
        undos: this.metrics.undoCount,
        redos: this.metrics.redoCount,
        rollbacks: this.metrics.rollbacksCount,
        avgDurationMs: this.metrics.getAverageDuration(),
      },
      history: {
        undoStackSize: this.history.getUndoStack().length,
        redoStackSize: this.history.getRedoStack().length,
      },
    };
  }
}
