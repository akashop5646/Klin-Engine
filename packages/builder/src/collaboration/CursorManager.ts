export interface CursorCoordinates {
  x: number;
  y: number;
}

export class CursorManager {
  private _cursors: Map<string, CursorCoordinates> = new Map(); // userId -> coordinates

  public setCursor(userId: string, x: number, y: number): void {
    this._cursors.set(userId, { x, y });
  }

  public getCursors(): Map<string, CursorCoordinates> {
    return this._cursors;
  }
}
