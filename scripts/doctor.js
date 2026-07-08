import fs from "fs";
import path from "path";

const PACKAGES_DIR = path.resolve("packages");
const APPS_DIR = path.resolve("apps");

console.log("=========================================");
console.log("  Klin Monorepo Doctor — Diagnostics  ");
console.log("=========================================\n");

let warnings = 0;
let errors = 0;

function reportError(msg) {
  console.error(`[ERROR] ${msg}`);
  errors++;
}

function reportWarning(msg) {
  console.warn(`[WARN]  ${msg}`);
  warnings++;
}

// 1. Scan packages
if (!fs.existsSync(PACKAGES_DIR)) {
  reportError("Packages directory not found.");
  process.exit(1);
}

const packages = fs.readdirSync(PACKAGES_DIR).filter((file) => {
  const fullPath = path.join(PACKAGES_DIR, file);
  return fs.statSync(fullPath).isDirectory();
});

console.log(`Discovered ${packages.length} packages under packages/.\n`);

const dependencyMap = new Map();

for (const pkg of packages) {
  const pkgDir = path.join(PACKAGES_DIR, pkg);
  
  // A. Check package.json
  const pkgJsonPath = path.join(pkgDir, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    reportError(`Missing package.json in packages/${pkg}`);
    continue;
  }

  let pkgJson;
  try {
    pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  } catch (err) {
    reportError(`Failed to parse package.json for packages/${pkg}: ${err.message}`);
    continue;
  }

  const pkgName = pkgJson.name;
  if (!pkgName) {
    reportError(`Missing name field in packages/${pkg}/package.json`);
  }

  // B. Check README.md
  const readmePath = path.join(pkgDir, "README.md");
  if (!fs.existsSync(readmePath)) {
    reportWarning(`Missing README.md in packages/${pkg}`);
  }

  // C. Check public API entry contract
  const indexPath = path.join(pkgDir, "src", "index.ts");
  if (!fs.existsSync(indexPath)) {
    reportError(`Missing public API contract src/index.ts in packages/${pkg}`);
  }

  // D. Check engine.json compatibility config
  const engineJsonPath = path.join(pkgDir, "engine.json");
  if (!fs.existsSync(engineJsonPath)) {
    reportWarning(`Missing engine.json compatibility description in packages/${pkg}`);
  } else {
    try {
      JSON.parse(fs.readFileSync(engineJsonPath, "utf-8"));
    } catch (err) {
      reportError(`Malformed engine.json in packages/${pkg}: ${err.message}`);
    }
  }

  // E. Record dependencies for circular reference checks
  const deps = Object.keys(pkgJson.dependencies || {}).filter((d) => d.startsWith("@klin/"));
  dependencyMap.set(pkgName || `@klin/${pkg}`, deps);

  // F. Scan files for forbidden imports (apps/ or studio/)
  scanForIllegalImports(pkgDir, pkg);
}

// 2. Circular Dependency Verification (DFS cycle detection)
checkCircularDependencies();

console.log("\n=========================================");
console.log(`Scan completed with ${errors} error(s) and ${warnings} warning(s).`);
console.log("=========================================");

if (errors > 0) {
  process.exit(1);
} else {
  console.log("\n[Klin Doctor] All framework extraction sanity checks PASSED successfully!");
  process.exit(0);
}

// --- Helpers ---

function scanForIllegalImports(dir, pkgName) {
  const files = getFilesRecursive(dir);
  const regex = /from\s+['"]([^'"]+)['"]/g;

  for (const file of files) {
    if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
    const content = fs.readFileSync(file, "utf-8");
    let match;
    while ((match = regex.exec(content)) !== null) {
      const importPath = match[1];
      if (
        importPath.includes("/apps/") ||
        importPath.startsWith("apps/") ||
        importPath.includes("/dashboard/") ||
        importPath.includes("/studio/")
      ) {
        reportError(`Forbidden reverse dependency import of '${importPath}' in packages/${pkgName}/${path.relative(dir, file)}`);
      }
    }
  }
}

function getFilesRecursive(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== "node_modules" && file !== "dist" && file !== ".turbo") {
        results = results.concat(getFilesRecursive(fullPath));
      }
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function checkCircularDependencies() {
  const visited = new Set();
  const stack = new Set();

  function detectCycle(node, pathStack = []) {
    if (stack.has(node)) {
      reportError(`Circular dependency detected: ${pathStack.join(" -> ")} -> ${node}`);
      return;
    }
    if (visited.has(node)) return;

    visited.add(node);
    stack.add(node);
    pathStack.push(node);

    const deps = dependencyMap.get(node) || [];
    for (const dep of deps) {
      detectCycle(dep, [...pathStack]);
    }

    stack.delete(node);
  }

  for (const node of dependencyMap.keys()) {
    detectCycle(node);
  }
}
