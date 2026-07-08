export class ComponentMemo {
  private _memos: Map<string, any> = new Map();

  public shouldUpdate(blockId: string, prevProps: any, nextProps: any): boolean {
    const serializedPrev = JSON.stringify(prevProps);
    const serializedNext = JSON.stringify(nextProps);
    if (serializedPrev === serializedNext) {
      return false;
    }
    this._memos.set(blockId, nextProps);
    return true;
  }
}
