export class TriggerManager {
  private _triggers: Map<string, Array<() => void>> = new Map();

  public bindTrigger(eventName: string, handler: () => void): void {
    if (!this._triggers.has(eventName)) {
      this._triggers.set(eventName, []);
    }
    this._triggers.get(eventName)!.push(handler);
  }

  public fireTrigger(eventName: string): void {
    const list = this._triggers.get(eventName);
    if (list) list.forEach((h) => h());
  }
}
