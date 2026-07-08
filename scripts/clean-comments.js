import fs from "fs";
import path from "path";

const DIRECTORIES = ["apps/cloud/src", "apps/studio/src"];

function cleanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  // Replace the specific corrupted comment markers with clean headers
  const cleaned = content.replace(/[\uFFFD]/g, "*");
  if (cleaned !== content) {
    fs.writeFileSync(filePath, cleaned, "utf8");
    console.log(`[CLEANED ENCODING] ${filePath}`);
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx") || entry.name.endsWith(".css"))) {
      cleanFile(fullPath);
    }
  }
}

console.log("Cleaning corrupted UTF-8 comment artifacts...");
for (const dir of DIRECTORIES) {
  scanDir(path.resolve(dir));
}
console.log("Encoding clean completed.");
