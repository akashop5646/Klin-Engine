export interface EntryRevisionConfig {
  id: string;
  entryId: string;
  snapshot: string;
  timestamp: Date;
  authorId?: string;
  comment?: string;
}

export class EntryRevision {
  public readonly id: string;
  public readonly entryId: string;
  public readonly snapshot: string;
  public readonly timestamp: Date;
  public readonly authorId?: string;
  public readonly comment?: string;

  constructor(config: EntryRevisionConfig) {
    this.id = config.id;
    this.entryId = config.entryId;
    this.snapshot = config.snapshot;
    this.timestamp = config.timestamp || new Date();
    this.authorId = config.authorId;
    this.comment = config.comment;
  }
}
