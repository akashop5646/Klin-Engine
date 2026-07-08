import { Timeline } from "./Timeline";

export class TimelineEditor {
  private _activeTimeline?: Timeline;

  public setTimeline(timeline: Timeline): void {
    this._activeTimeline = timeline;
  }

  public getTimeline(): Timeline | undefined {
    return this._activeTimeline;
  }
}
