export interface BlockComment {
  id: string;
  blockId: string;
  author: string;
  text: string;
  timestampMs: number;
}

export class CommentSystem {
  private _comments: BlockComment[] = [];

  public addComment(blockId: string, author: string, text: string): BlockComment {
    const id = Math.random().toString(36).substring(2, 9);
    const nc: BlockComment = {
      id,
      blockId,
      author,
      text,
      timestampMs: Date.now(),
    };
    this._comments.push(nc);
    return nc;
  }

  public getComments(blockId: string): BlockComment[] {
    return this._comments.filter((c) => c.blockId === blockId);
  }
}
