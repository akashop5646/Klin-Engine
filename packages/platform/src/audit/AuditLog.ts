export interface AuditLog {
  readonly id: string;
  readonly userId: string;
  readonly operation: string;
  readonly targetId: string;
  readonly timestamp: number;
}
