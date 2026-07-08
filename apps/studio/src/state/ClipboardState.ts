export class ClipboardState {
  private _bufferJson?: string;

  public copy(nodeJson: string): void {
    this._bufferJson = nodeJson;
    console.log("Copied visual layout block node JSON to clipboard buffer.");
  }

  public paste(): string | undefined {
    return this._bufferJson;
  }

  public get hasContent(): boolean {
    return this._bufferJson !== undefined;
  }
}
