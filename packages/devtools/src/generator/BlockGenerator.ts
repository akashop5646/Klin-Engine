import * as fs from "fs";
import * as path from "path";

export class BlockGenerator {
  public async generate(targetDir: string, blockName: string): Promise<boolean> {
    console.log(`Generating block bundle: ${blockName}`);
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(targetDir, "block.json"),
        JSON.stringify({
          name: blockName,
          category: "Common",
          properties: {}
        }, null, 2)
      );

      fs.writeFileSync(
        path.join(targetDir, "index.css"),
        `.klin-block-${blockName} {\n  padding: 1rem;\n}\n`
      );

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
