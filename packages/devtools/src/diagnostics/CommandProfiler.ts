export class CommandProfiler {
  private _startTime?: number;

  public start(): void {
    this._startTime = Date.now();
  }

  public end(commandName: string): void {
    if (this._startTime) {
      console.log(`[Profiling] Command "klin ${commandName}" completed in ${Date.now() - this._startTime}ms`);
    }
  }
}
