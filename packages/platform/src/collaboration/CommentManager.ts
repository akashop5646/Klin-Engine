export interface CanvasComment {
  id: string;
  websiteId: string;
  pageId: string;
  authorId: string;
  content: string;
  resolved: boolean;
  createdAt: number;
}

export class CommentManager {
  private _comments: Map<string, CanvasComment> = new Map();

  public addComment(websiteId: string, pageId: string, authorId: string, content: string): CanvasComment {
    const id = "com-" + Math.random().toString(36).substring(2, 9);
    const comment: CanvasComment = {
      id,
      websiteId,
      pageId,
      authorId,
      content,
      resolved: false,
      createdAt: Date.now(),
    };
    this._comments.set(id, comment);
    return comment;
  }

  public resolveComment(commentId: string): void {
    const comment = this._comments.get(commentId);
    if (comment) {
      comment.resolved = true;
    }
  }

  public getComments(websiteId: string): CanvasComment[] {
    return Array.from(this._comments.values()).filter((c) => c.websiteId === websiteId);
  }
}
