export class VisibilityInspector {
  private _visibilityRules: Map<string, string[]> = new Map(); // blockId -> rules

  public addRule(blockId: string, conditionRule: string): void {
    if (!this._visibilityRules.has(blockId)) {
      this._visibilityRules.set(blockId, []);
    }
    this._visibilityRules.get(blockId)!.push(conditionRule);
  }

  public getRules(blockId: string): string[] {
    return this._visibilityRules.get(blockId) || [];
  }
}
