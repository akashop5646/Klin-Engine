export class ClipboardManager {
  private _buffer: any;
  private _bufferType?: "Block" | "Styles" | "Section";

  public copy(data: any, type: "Block" | "Styles" | "Section"): void {
    this._buffer = data;
    this._bufferType = type;
  }

  public paste(): { data: any; type: string } | undefined {
    if (!this._bufferType) return undefined;
    return { data: this._buffer, type: this._bufferType };
  }
}
