export class FolderManager {
  private _folders: string[] = ["/", "/banners", "/products", "/logos"];

  public getFolders(): string[] {
    return this._folders;
  }

  public createFolder(path: string): void {
    if (!this._folders.includes(path)) {
      this._folders.push(path);
    }
  }
}
