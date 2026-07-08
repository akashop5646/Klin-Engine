export interface PackageMeta {
  name: string;
  version: string;
}

export class PackageRegistry {
  private _packages: Map<string, PackageMeta> = new Map();

  public addPackage(pkg: PackageMeta): void {
    this._packages.set(pkg.name, pkg);
  }

  public getPackage(name: string): PackageMeta | undefined {
    return this._packages.get(name);
  }
}
