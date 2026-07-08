import { AuditLog } from "./AuditLog";

export class AuditManager {
  private _logs: AuditLog[] = [];

  public record(userId: string, operation: string, targetId: string): void {
    this._logs.push({
      id: "aud-" + Math.random().toString(36).substring(2, 9),
      userId,
      operation,
      targetId,
      timestamp: Date.now(),
    });
  }

  public get logs(): AuditLog[] {
    return this._logs;
  }
}
