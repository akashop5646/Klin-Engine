export class Moderation {
  private _approved: Set<string> = new Set();

  public approve(reviewId: string): void {
    this._approved.add(reviewId);
  }

  public isApproved(reviewId: string): boolean {
    return this._approved.has(reviewId);
  }
}
