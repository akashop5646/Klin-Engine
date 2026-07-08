import * as fs from "fs";
import * as path from "path";

export class ProjectGenerator {
  public async generate(targetDir: string, projectName: string): Promise<boolean> {
    console.log(`Generating project template scaffold for: ${projectName} at ${targetDir}`);
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(targetDir, "package.json"),
        JSON.stringify({
          name: projectName,
          version: "1.0.0",
          private: true,
          dependencies: {
            "@klin/core": "*"
          }
        }, null, 2)
      );

      fs.writeFileSync(
        path.join(targetDir, "klin.config.ts"),
        `export default {\n  projectName: "${projectName}",\n  version: "1.0.0"\n};\n`
      );

      return true;
    } catch (e) {
      console.error("Failed to generate project:", e);
      return false;
    }
  }
}
