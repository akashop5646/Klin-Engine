import * as fs from "fs";
import * as path from "path";

export class WorkspaceGenerator {
  public async generate(targetDir: string, workspaceName: string): Promise<boolean> {
    console.log(`Generating workspace config at: ${targetDir}`);
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(targetDir, "package.json"),
        JSON.stringify({
          name: workspaceName,
          private: true,
          workspaces: [
            "packages/*",
            "apps/*"
          ]
        }, null, 2)
      );

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
