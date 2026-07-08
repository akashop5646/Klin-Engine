export class CLIProgress {
  private _currentStep: number = 0;
  private _totalSteps: number = 100;
  private _label: string = "";

  public start(label: string, totalSteps: number = 100): void {
    this._label = label;
    this._totalSteps = totalSteps;
    this._currentStep = 0;
    this.render();
  }

  public update(step: number, newLabel?: string): void {
    this._currentStep = step;
    if (newLabel) {
      this._label = newLabel;
    }
    this.render();
  }

  public finish(label?: string): void {
    this._currentStep = this._totalSteps;
    if (label) {
      this._label = label;
    }
    this.render();
    process.stdout.write("\n");
  }

  private render(): void {
    const width = 30;
    const ratio = Math.min(Math.max(this._currentStep / this._totalSteps, 0), 1);
    const filledCount = Math.round(ratio * width);
    const emptyCount = width - filledCount;

    const bar = "█".repeat(filledCount) + "░".repeat(emptyCount);
    const percent = Math.round(ratio * 100);

    process.stdout.write(`\r${this._label} [${bar}] ${percent}%`);
  }
}
