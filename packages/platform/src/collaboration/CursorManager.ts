export interface CursorPosition {
  x: number;
  y: number;
  timestamp: number;
}

export class CursorManager {
  private _positions: Map<string, CursorPosition> = new Map();

  public updatePosition(userId: string, x: number, y: number): void {
    this._positions.set(userId, { x, y, timestamp: Date.now() });
  }

  public getPosition(userId: string): CursorPosition | undefined {
    return this._positions.get(userId);
  }
}
