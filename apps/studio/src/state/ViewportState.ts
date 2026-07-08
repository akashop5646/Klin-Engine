export type ScreenBreakpoint = "Desktop" | "Tablet" | "Mobile";

export class ViewportState {
  private _breakpoint: ScreenBreakpoint = "Desktop";
  private _zoom: number = 100;

  public setBreakpoint(bp: ScreenBreakpoint): void {
    this._breakpoint = bp;
    console.log(`Viewport breakpoint set to: ${bp}`);
  }

  public setZoom(zoomPercent: number): void {
    this._zoom = zoomPercent;
    console.log(`Viewport zoom scale set to: ${zoomPercent}%`);
  }

  public get breakpoint(): ScreenBreakpoint {
    return this._breakpoint;
  }

  public get zoom(): number {
    return this._zoom;
  }
}
