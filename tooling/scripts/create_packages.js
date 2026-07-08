import fs from "fs";
import path from "path";

const packages = [
  "api-contracts",
  "config",
  "core",
  "shared",
  "ui",
  "blocks",
  "templates",
  "theme",
  "renderer",
  "compiler",
  "runtime",
  "store-engine",
  "builder-core",
  "puck-adapter",
  "registry",
  "schemas",
  "command-engine",
  "event-bus",
  "workflow",
  "job-engine",
  "data",
  "assets",
  "billing",
  "permissions",
  "feature-flags",
  "observability",
  "marketplace",
  "extension-sdk",
  "sdk",
  "ai-rules",
  "utils",
  "types",
  "docs"
];

const workspaceRoot = path.resolve(".");

packages.forEach((pkgName) => {
  const pkgDir = path.join(workspaceRoot, "packages", pkgName);
  if (!fs.existsSync(pkgDir)) {
    fs.mkdirSync(pkgDir, { recursive: true });
  }

  // package.json
  const pkgJsonPath = path.join(pkgDir, "package.json");
  const pkgJson = {
    name: `@klin/${pkgName}`,
    version: "1.0.0",
    private: true,
    main: "./src/index.ts",
    types: "./src/index.ts",
    scripts: {
      "build": "tsc --noEmit",
      "lint": `echo 'Linting ${pkgName}...'`,
      "test": "echo 'No tests'"
    },
    dependencies: pkgName === "core" ? {} : {
      "@klin/core": "*"
    }
  };
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

  // tsconfig.json
  const tsconfigPath = path.join(pkgDir, "tsconfig.json");
  const tsconfig = {
    extends: "../../tooling/typescript/tsconfig.json",
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "@/*": ["./src/*"]
      }
    },
    include: ["src"]
  };
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

  // src/index.ts
  const srcDir = path.join(pkgDir, "src");
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  const indexTsPath = path.join(srcDir, "index.ts");
  
  let code = `export const name = "${pkgName}";\n`;
  if (pkgName === "core") {
    code += `export const VERSION = "0.1.0";\n`;
  } else {
    code += `import { VERSION } from "@klin/core";\n`;
    code += `export const info = () => \`Package \${name} linked with core version \${VERSION}\`;\n`;
  }
  fs.writeFileSync(indexTsPath, code);
  
  console.log(`Created package placeholder for: @klin/${pkgName}`);
});
