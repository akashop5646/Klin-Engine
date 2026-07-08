export class RegistryCache {
  private _packagesCache: Record<string, any> = {};

  public getPackageMetadata(pkgName: string): any {
    return this._packagesCache[pkgName];
  }

  public cachePackageMetadata(pkgName: string, metadata: any): void {
    this._packagesCache[pkgName] = metadata;
  }
}
