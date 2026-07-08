export type LockLevel = "Editable" | "Locked" | "Premium" | "ReadOnly";

export class ProtectionManager {
  private _protections: Map<string, LockLevel> = new Map(); // blockId -> lockLevel

  public setLockLevel(blockId: string, level: LockLevel): void {
    this._protections.set(blockId, level);
  }

  public getLockLevel(blockId: string): LockLevel {
    return this._protections.get(blockId) || "Editable";
  }

  public isEditable(blockId: string): boolean {
    const lvl = this.getLockLevel(blockId);
    return lvl === "Editable";
  }
}
