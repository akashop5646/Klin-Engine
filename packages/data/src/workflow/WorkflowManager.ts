import { Entry, EntryStatus } from "../entities/Entry";
import { PublishingWorkflow } from "./PublishingWorkflow";

export class WorkflowManager {
  public static transitionEntry(entry: Entry, nextStatus: EntryStatus): void {
    const currentStatus = entry.status;
    if (currentStatus === nextStatus) return;

    if (!PublishingWorkflow.isValidTransition(currentStatus, nextStatus)) {
      throw new Error(`Invalid status transition from ${currentStatus} to ${nextStatus}`);
    }

    entry.status = nextStatus;
    entry.updatedAt = new Date();
  }
}
