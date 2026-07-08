export class TelemetryManager {
  private _enabled: boolean = true;

  public setEnabled(val: boolean): void {
    this._enabled = val;
  }

  public recordEvent(eventName: string, properties: Record<string, any> = {}): void {
    if (this._enabled) {
      console.log(`[Telemetry] Event: ${eventName}`, properties);
    }
  }
}
