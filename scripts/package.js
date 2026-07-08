import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const RELEASE_DIR = path.resolve("release");
const TARGET_DIR = path.join(RELEASE_DIR, "klin-v1");

console.log("=========================================");
console.log("  Klin Framework Release Packaging System  ");
console.log("=========================================\n");

// 1. Compile framework
console.log("Step 1: Compiling all packages, SDK, and CLI...");
execSync("node scripts/build-all.js", { stdio: "inherit" });

// 2. Run diagnostics check
console.log("\nStep 2: Running framework doctor check...");
execSync("node scripts/doctor.js", { stdio: "inherit" });

// 3. Prepare release folder structure
console.log("\nStep 3: Preparing release directories...");
if (fs.existsSync(RELEASE_DIR)) {
  fs.rmSync(RELEASE_DIR, { recursive: true, force: true });
}
fs.mkdirSync(RELEASE_DIR, { recursive: true });
fs.mkdirSync(TARGET_DIR, { recursive: true });

// 4. Copy compiled packages
const packages = [
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

console.log("\nStep 4: Copying compiled packages...");
const packagesTargetDir = path.join(TARGET_DIR, "packages");
fs.mkdirSync(packagesTargetDir, { recursive: true });

for (const pkg of packages) {
  const pkgSrcDir = path.resolve("packages", pkg);
  const pkgDestDir = path.join(packagesTargetDir, pkg);
  fs.mkdirSync(pkgDestDir, { recursive: true });

  // Copy dist folder
  const distSrc = path.join(pkgSrcDir, "dist");
  if (fs.existsSync(distSrc)) {
    copyDirSync(distSrc, path.join(pkgDestDir, "dist"));
  }

  // Copy package.json
  copyFileSync(path.join(pkgSrcDir, "package.json"), path.join(pkgDestDir, "package.json"));

  // Copy README.md
  copyFileSync(path.join(pkgSrcDir, "README.md"), path.join(pkgDestDir, "README.md"));

  // Copy engine.json
  copyFileSync(path.join(pkgSrcDir, "engine.json"), path.join(pkgDestDir, "engine.json"));
}

// 5. Copy SDK and CLI compiled outputs
console.log("\nStep 5: Copying SDK and CLI compiled packages...");
const sdkSrc = path.resolve("sdk");
const sdkDest = path.join(TARGET_DIR, "sdk");
fs.mkdirSync(sdkDest, { recursive: true });
if (fs.existsSync(path.join(sdkSrc, "dist"))) {
  copyDirSync(path.join(sdkSrc, "dist"), path.join(sdkDest, "dist"));
}
copyFileSync(path.join(sdkSrc, "package.json"), path.join(sdkDest, "package.json"));
copyFileSync(path.join(sdkSrc, "README.md"), path.join(sdkDest, "README.md"));

const cliSrc = path.resolve("cli");
const cliDest = path.join(TARGET_DIR, "cli");
fs.mkdirSync(cliDest, { recursive: true });
if (fs.existsSync(path.join(cliSrc, "dist"))) {
  copyDirSync(path.join(cliSrc, "dist"), path.join(cliDest, "dist"));
}
copyFileSync(path.join(cliSrc, "package.json"), path.join(cliDest, "package.json"));
copyFileSync(path.join(cliSrc, "README.md"), path.join(cliDest, "README.md"));

// 6. Copy build/diagnostics scripts
console.log("\nStep 6: Copying framework build and diagnostics scripts...");
const scriptsDest = path.join(TARGET_DIR, "scripts");
fs.mkdirSync(scriptsDest, { recursive: true });
copyFileSync("scripts/build-all.js", path.join(scriptsDest, "build-all.js"));
copyFileSync("scripts/doctor.js", path.join(scriptsDest, "doctor.js"));
copyFileSync("scripts/package.js", path.join(scriptsDest, "package.js"));

// 7. Copy registries, starters, examples, and docs
console.log("\nStep 7: Copying starters, registry, docs, and examples...");
copyDirSync("registry", path.join(TARGET_DIR, "registry"));
copyDirSync("starters", path.join(TARGET_DIR, "starters"));
copyDirSync("examples", path.join(TARGET_DIR, "examples"));
if (fs.existsSync("docs")) {
  copyDirSync("docs", path.join(TARGET_DIR, "docs"));
}
copyFileSync("ARCHITECTURE.md", path.join(TARGET_DIR, "ARCHITECTURE.md"));
copyFileSync("README.md", path.join(TARGET_DIR, "README.md"));

// Create placeholders for missing files
ensureFileExists("LICENSE", "MIT License\n");
ensureFileExists("CHANGELOG.md", "# Changelog\n\n## 1.0.0\n- Initial framework release.\n");
copyFileSync("LICENSE", path.join(TARGET_DIR, "LICENSE"));
copyFileSync("CHANGELOG.md", path.join(TARGET_DIR, "CHANGELOG.md"));

// 8. Generate manifest.json
console.log("\nStep 8: Generating release manifest.json...");
const manifest = {
  version: "1.0.0",
  packages: packages.map(pkg => `@klin/${pkg}`),
  sdk: "@klin/sdk",
  cli: "@klin/cli"
};
fs.writeFileSync(path.join(TARGET_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// 9. Compress release folder into a ZIP file
console.log("\nStep 9: Compressing release folder into ZIP archive...");
try {
  execSync(`powershell -Command "Compress-Archive -Path '${TARGET_DIR}' -DestinationPath '${path.join(RELEASE_DIR, "klin-v1.zip")}' -Force"`);
  console.log("[SUCCESS] Compressed release archive successfully!");
} catch (err) {
  console.error(`[FAIL] Compression failed: ${err.message}`);
}

console.log("\n=========================================");
console.log("Klin Framework release pack successfully generated!");
console.log(`ZIP path: ${path.join(RELEASE_DIR, "klin-v1.zip")}`);
console.log("=========================================");

// --- Helpers ---
function copyFileSync(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

function ensureFileExists(filepath, content) {
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, content);
  }
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".turbo") continue;

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
