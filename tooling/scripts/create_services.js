import fs from "fs";
import path from "path";

const services = [
  "identity",
  "commerce",
  "media",
  "publishing",
  "analytics",
  "notifications",
  "search",
  "ai",
  "queue"
];

const workspaceRoot = path.resolve(".");

services.forEach((serviceName) => {
  const serviceDir = path.join(workspaceRoot, "services", serviceName);
  if (!fs.existsSync(serviceDir)) {
    fs.mkdirSync(serviceDir, { recursive: true });
  }

  // package.json
  const pkgJsonPath = path.join(serviceDir, "package.json");
  const pkgJson = {
    name: `@klin/service-${serviceName}`,
    version: "1.0.0",
    private: true,
    scripts: {
      "build": `echo 'Service ${serviceName} built.'`,
      "lint": `echo 'Service ${serviceName} linted.'`,
      "test": `echo 'Service ${serviceName} tested.'`
    }
  };
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

  console.log(`Created service package configuration for: @klin/service-${serviceName}`);
});
