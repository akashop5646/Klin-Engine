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
  "devtools",
  "builder-core",
  "event-bus",
  "registry",
  "command-engine",
];

console.log("=========================================");
console.log("  Building Klin Framework Modules  ");
console.log("=========================================\n");

let successCount = 0;
let failCount = 0;

function buildPackage(pkg) {
  const pkgDir = path.join(PACKAGES_DIR, pkg);

  if (!fs.existsSync(pkgDir)) {
    console.error(`[ERROR] Package directory not found for: packages/${pkg}`);
    failCount++;
    return;
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

function getDependencyOrder(packages) {
  const dependencyMap = new Map();

  for (const pkg of packages) {
    const pkgJsonPath = path.join(PACKAGES_DIR, pkg, "package.json");
    if (!fs.existsSync(pkgJsonPath)) {
      dependencyMap.set(pkg, []);
      continue;
    }

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    const deps = Object.keys(pkgJson.dependencies || {}).filter(
      (dep) => dep.startsWith("@klin/") && packages.includes(dep.replace("@klin/", ""))
    );

    dependencyMap.set(pkg, deps.map((dep) => dep.replace("@klin/", "")));
  }

  const visiting = new Set();
  const visited = new Set();
  const order = [];

  const visit = (pkg) => {
    if (visited.has(pkg)) return;
    if (visiting.has(pkg)) return;

    visiting.add(pkg);
    for (const dep of dependencyMap.get(pkg) || []) {
      visit(dep);
    }
    visiting.delete(pkg);
    visited.add(pkg);
    order.push(pkg);
  };

  for (const pkg of packages) {
    visit(pkg);
  }

  return order;
}

// 1. Build core engine packages in dependency-aware order
const orderedPackages = getDependencyOrder(CORE_PACKAGES);
for (const pkg of orderedPackages) {
  buildPackage(pkg);
}

// 2. Build root-level SDK and CLI packages (optional - only if they have src)
const ROOT_PACKAGES = [
  { name: "@klin/sdk", dir: "sdk" },
  { name: "@klin/cli", dir: "cli" },
];

for (const pkg of ROOT_PACKAGES) {
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
