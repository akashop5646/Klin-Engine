import fs from "fs";
import path from "path";

const PACKAGES_DIR = path.resolve("packages");

const packages = fs.readdirSync(PACKAGES_DIR).filter((file) => {
  const fullPath = path.join(PACKAGES_DIR, file);
  return fs.statSync(fullPath).isDirectory();
});

console.log(`Fixing package.json entry paths for ${packages.length} packages...`);

for (const pkg of packages) {
  const pkgJsonPath = path.join(PACKAGES_DIR, pkg, "package.json");
  if (!fs.existsSync(pkgJsonPath)) continue;

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  
  let modified = false;
  if (pkgJson.main === "./src/index.ts") {
    pkgJson.main = "./dist/index.js";
    modified = true;
  }
  if (pkgJson.types === "./src/index.ts") {
    pkgJson.types = "./dist/index.d.ts";
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");
    console.log(`[FIXED] packages/${pkg}/package.json`);
  }
}

// Fix sdk package.json
const sdkJsonPath = path.resolve("sdk", "package.json");
if (fs.existsSync(sdkJsonPath)) {
  const sdkJson = JSON.parse(fs.readFileSync(sdkJsonPath, "utf-8"));
  if (sdkJson.main === "./src/index.ts") {
    sdkJson.main = "./dist/index.js";
    sdkJson.types = "./dist/index.d.ts";
    fs.writeFileSync(sdkJsonPath, JSON.stringify(sdkJson, null, 2) + "\n");
    console.log("[FIXED] sdk/package.json");
  }
}

// Fix cli package.json
const cliJsonPath = path.resolve("cli", "package.json");
if (fs.existsSync(cliJsonPath)) {
  const cliJson = JSON.parse(fs.readFileSync(cliJsonPath, "utf-8"));
  if (cliJson.main === "./src/index.ts") {
    cliJson.main = "./dist/index.js";
    cliJson.types = "./dist/index.d.ts";
    fs.writeFileSync(cliJsonPath, JSON.stringify(cliJson, null, 2) + "\n");
    console.log("[FIXED] cli/package.json");
  }
}
