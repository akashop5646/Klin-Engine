export type CommandLifecycleState =
  | "Created"
  | "Validated"
  | "Queued"
  | "Executing"
  | "Executed"
  | "Completed"
  | "Failed"
  | "RolledBack";

export interface CommandResult<T = any> {
  commandId: string;
  success: boolean;
  value?: T;
  error?: Error;
  duration: number;
  eventsPublished: number;
  historyRecorded: boolean;
}
