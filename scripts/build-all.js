import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const PACKAGES_DIR = path.resolve("packages");

const CORE_PACKAGES = [
  "core",
  "runtime",
  "data",
  "theme",
  "blocks",
  "pages",
  "templates",
  "builder",
  "renderer",
  "platform",
  "commerce",
  "devtools"
];

console.log("=========================================");
console.log("  Building Klin Framework Modules  ");
console.log("=========================================\n");

let successCount = 0;
let failCount = 0;

// 1. Build core engine packages
for (const pkg of CORE_PACKAGES) {
  const pkgDir = path.join(PACKAGES_DIR, pkg);
  
  if (!fs.existsSync(pkgDir)) {
    console.error(`[ERROR] Package directory not found for: packages/${pkg}`);
    failCount++;
    continue;
  }

  console.log(`Building @klin/${pkg}...`);
  
  const cmd = `npx tsc -p packages/${pkg}/tsconfig.json --noEmit false --outDir packages/${pkg}/dist --declaration true --sourceMap true --allowImportingTsExtensions false`;
  
  try {
    execSync(cmd, { stdio: "inherit", cwd: path.resolve() });
    console.log(`[SUCCESS] Compiled @klin/${pkg} successfully!\n`);
    successCount++;
  } catch (err) {
    console.error(`[FAIL] Compilation failed for @klin/${pkg}: ${err.message}\n`);
    failCount++;
  }
}

// 2. Build root-level SDK and CLI packages
const ROOT_PACKAGES = [
  { name: "@klin/sdk", dir: "sdk" },
  { name: "@klin/cli", dir: "cli" }
];

for (const pkg of ROOT_PACKAGES) {
  const pkgDir = path.resolve(pkg.dir);
  if (!fs.existsSync(pkgDir)) {
    console.error(`[ERROR] Root package directory not found for: ${pkg.dir}`);
    failCount++;
    continue;
  }

  console.log(`Building ${pkg.name}...`);
  const cmd = `npx tsc -p ${pkg.dir}/tsconfig.json --noEmit false --outDir ${pkg.dir}/dist --declaration true --sourceMap true --allowImportingTsExtensions false`;
  
  try {
    execSync(cmd, { stdio: "inherit", cwd: path.resolve() });
    console.log(`[SUCCESS] Compiled ${pkg.name} successfully!\n`);
    successCount++;
  } catch (err) {
    console.error(`[FAIL] Compilation failed for ${pkg.name}: ${err.message}\n`);
    failCount++;
  }
}

console.log("=========================================");
console.log(`Compilation summary: ${successCount} built successfully, ${failCount} failed.`);
console.log("=========================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
