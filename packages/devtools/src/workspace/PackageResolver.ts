import * as fs from "fs";
import * as path from "path";

export class PackageResolver {
  public resolvePackageJson(packageDir: string): any {
    const pkgPath = path.join(packageDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      return JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    }
    return null;
  }
}
