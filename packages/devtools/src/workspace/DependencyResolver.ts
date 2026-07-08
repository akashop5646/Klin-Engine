export class DependencyResolver {
  public resolveDependencies(pkgJson: any): string[] {
    if (!pkgJson) return [];
    const deps = {
      ...(pkgJson.dependencies || {}),
      ...(pkgJson.devDependencies || {})
    };
    return Object.keys(deps);
  }
}
