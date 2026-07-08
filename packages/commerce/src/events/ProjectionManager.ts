import { CommerceEvent } from "./CommerceEvents";

export class ProjectionManager {
  private _projections: any[] = [];

  public registerProjection(projection: any): void {
    this._projections.push(projection);
  }

  public handleEvent(event: CommerceEvent): void {
    for (const proj of this._projections) {
      if (typeof proj.onEvent === "function") {
        proj.onEvent(event);
      }
    }
  }
}
