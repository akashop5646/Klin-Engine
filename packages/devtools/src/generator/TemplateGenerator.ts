import * as fs from "fs";
import * as path from "path";

export class TemplateGenerator {
  public async generate(targetDir: string, templateName: string): Promise<boolean> {
    console.log(`Generating visual template: ${templateName}`);
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(targetDir, `${templateName}.json`),
        JSON.stringify({
          schema: "http://klin.io/schema/template.json",
          name: templateName,
          layout: "default",
          sections: []
        }, null, 2)
      );

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
