import { PlatformProjection } from "./PlatformProjection";

export class ProjectionEngine {
  private _projections: PlatformProjection[] = [];

  public register(projection: PlatformProjection): void {
    this._projections.push(projection);
  }

  public dispatch(event: any): void {
    for (const projection of this._projections) {
      projection.handleEvent(event);
    }
  }
}
