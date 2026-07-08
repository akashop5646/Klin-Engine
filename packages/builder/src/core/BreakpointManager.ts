export type BreakpointDevice =
  | "DesktopXL"
  | "Desktop"
  | "Laptop"
  | "Tablet"
  | "LandscapeTablet"
  | "Mobile"
  | "SmallMobile";

export interface Breakpoint {
  name: BreakpointDevice;
  minWidth: number;
  maxWidth?: number;
}

export class BreakpointManager {
  private _breakpoints: Breakpoint[] = [
    { name: "SmallMobile", minWidth: 0, maxWidth: 359 },
    { name: "Mobile", minWidth: 360, maxWidth: 767 },
    { name: "LandscapeTablet", minWidth: 768, maxWidth: 1023 },
    { name: "Tablet", minWidth: 1024, maxWidth: 1279 },
    { name: "Laptop", minWidth: 1280, maxWidth: 1439 },
    { name: "Desktop", minWidth: 1440, maxWidth: 1919 },
    { name: "DesktopXL", minWidth: 1920 },
  ];

  public getBreakpoints(): Breakpoint[] {
    return this._breakpoints;
  }

  public getDeviceForWidth(width: number): BreakpointDevice {
    const matched = this._breakpoints.find(
      (b) => width >= b.minWidth && (b.maxWidth === undefined || width <= b.maxWidth)
    );
    return matched ? matched.name : "Desktop";
  }
}
