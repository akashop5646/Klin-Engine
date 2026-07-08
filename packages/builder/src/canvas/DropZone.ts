export class DropZone {
  public id: string;
  public allowedBlockTypes?: string[];

  constructor(id: string, allowedBlockTypes?: string[]) {
    this.id = id;
    this.allowedBlockTypes = allowedBlockTypes;
  }
}
