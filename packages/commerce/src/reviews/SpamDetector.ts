export class SpamDetector {
  public isSpam(comment: string): boolean {
    return comment.includes("buy cheap coins") || comment.includes("spam link");
  }
}
