export class TimerWheel {
  private _ticks: number = 0;
  private _slots: Array<Array<() => void>> = Array.from({ length: 60 }, () => []);

  public addTimeout(delaySec: number, callback: () => void): void {
    const slotIndex = (this._ticks + delaySec) % 60;
    this._slots[slotIndex].push(callback);
  }

  public tick(): void {
    const activeCallbacks = this._slots[this._ticks];
    this._slots[this._ticks] = [];
    activeCallbacks.forEach((cb) => cb());
    this._ticks = (this._ticks + 1) % 60;
  }
}
