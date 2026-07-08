import { EntryStatus } from "../entities/Entry";

export class PublishingWorkflow {
  private static readonly TRANSITIONS: Record<EntryStatus, EntryStatus[]> = {
    Draft: ["Review", "Archived"],
    Review: ["Draft", "Approved", "Archived"],
    Approved: ["Draft", "Scheduled", "Published", "Archived"],
    Scheduled: ["Draft", "Published", "Archived"],
    Published: ["Archived"],
    Archived: ["Draft"],
  };

  public static isValidTransition(from: EntryStatus, to: EntryStatus): boolean {
    const allowed = this.TRANSITIONS[from];
    return allowed ? allowed.includes(to) : false;
  }
}
