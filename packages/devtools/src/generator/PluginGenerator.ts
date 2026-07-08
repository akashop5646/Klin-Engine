import * as fs from "fs";
import * as path from "path";

export class PluginGenerator {
  public async generate(targetDir: string, pluginName: string): Promise<boolean> {
    console.log(`Generating DevTools plugin bundle: ${pluginName}`);
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(targetDir, "plugin.json"),
        JSON.stringify({
          name: pluginName,
          version: "1.0.0",
          capabilities: ["CLI", "Validator"]
        }, null, 2)
      );

      fs.writeFileSync(
        path.join(targetDir, "index.ts"),
        `export function register(api: any) {\n  console.log("Plugin ${pluginName} initialized");\n}\n`
      );

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
