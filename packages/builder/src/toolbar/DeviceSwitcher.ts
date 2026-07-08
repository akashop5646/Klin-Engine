import { BreakpointDevice } from "../core/BreakpointManager";

export class DeviceSwitcher {
  private _device: BreakpointDevice = "Desktop";

  public switchDevice(device: BreakpointDevice): void {
    this._device = device;
  }

  public get activeDevice(): BreakpointDevice {
    return this._device;
  }
}
