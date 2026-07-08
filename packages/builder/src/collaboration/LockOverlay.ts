export class LockOverlay {
  public renderOverlay(blockId: string, lockedByUsername: string): string {
    return `Block ${blockId} is locked for editing by ${lockedByUsername}`;
  }
}
