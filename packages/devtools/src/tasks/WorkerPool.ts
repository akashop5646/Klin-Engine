export class WorkerPool {
  private _activeWorkers: number = 0;
  private _maxWorkers: number;

  constructor(maxWorkers: number = 4) {
    this._maxWorkers = maxWorkers;
  }

  public async runTask<T>(taskFn: () => Promise<T>): Promise<T> {
    while (this._activeWorkers >= this._maxWorkers) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    this._activeWorkers++;
    try {
      return await taskFn();
    } finally {
      this._activeWorkers--;
    }
  }

  public get activeWorkersCount(): number {
    return this._activeWorkers;
  }
}
