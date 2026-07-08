export class AlignmentEngine {
  public snap(value: number, step: number = 8): number {
    return Math.round(value / step) * step;
  }
}
