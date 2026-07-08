export class Telemetry {
  public async exportMetric(name: string, value: number): Promise<void> {
    console.log(`Telemetry exported metric [${name}]: ${value}`);
  }
}
