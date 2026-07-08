export interface TimelineKeyframe {
  offsetMs: number;
  properties: Record<string, any>;
}

export class Timeline {
  public id: string;
  public label: string;
  public keyframes: TimelineKeyframe[] = [];

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

  public addKeyframe(offsetMs: number, properties: Record<string, any>): void {
    this.keyframes.push({ offsetMs, properties });
    this.keyframes.sort((a, b) => a.offsetMs - b.offsetMs);
  }
}
