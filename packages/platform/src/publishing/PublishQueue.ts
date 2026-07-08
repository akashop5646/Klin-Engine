export class PublishQueue {
  private _jobs: string[] = [];

  public add(websiteId: string): void {
    this._jobs.push(websiteId);
  }

  public next(): string | undefined {
    return this._jobs.shift();
  }
}
