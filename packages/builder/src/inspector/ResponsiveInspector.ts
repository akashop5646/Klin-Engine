import { BreakpointDevice } from "../core/BreakpointManager";

export class ResponsiveInspector {
  private _overrides: Map<string, Map<BreakpointDevice, Record<string, any>>> = new Map(); // blockId -> device -> overrides

  public setOverride(blockId: string, device: BreakpointDevice, props: Record<string, any>): void {
    if (!this._overrides.has(blockId)) {
      this._overrides.set(blockId, new Map());
    }
    this._overrides.get(blockId)!.set(device, props);
  }

  public getOverride(blockId: string, device: BreakpointDevice): Record<string, any> | undefined {
    return this._overrides.get(blockId)?.get(device);
  }
}
