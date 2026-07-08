export class PreviewManager {
  private _isPreviewMode: boolean = false;

  public togglePreview(): void {
    this._isPreviewMode = !this._isPreviewMode;
  }

  public get isPreviewMode(): boolean {
    return this._isPreviewMode;
  }
}
