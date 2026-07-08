export class MetricsCollector {
  executedCount = 0;
  failedCount = 0;
  undoCount = 0;
  redoCount = 0;
  rollbacksCount = 0;
  totalDuration = 0;

  recordExecution(duration: number, success: boolean) {
    if (success) {
      this.executedCount++;
    } else {
      this.failedCount++;
    }
    this.totalDuration += duration;
  }

  recordUndo() {
    this.undoCount++;
  }

  recordRedo() {
    this.redoCount++;
  }

  recordRollback() {
    this.rollbacksCount++;
  }

  getAverageDuration(): number {
    const total = this.executedCount + this.failedCount;
    return total ? this.totalDuration / total : 0;
  }
}
