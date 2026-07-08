import * as fs from "fs";
import * as path from "path";

export class ComponentExporter {
  public exportComponent(targetFile: string, codeContent: string): void {
    const dir = path.dirname(targetFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetFile, codeContent);
    console.log(`Exported converted component file to: ${targetFile}`);
  }
}
