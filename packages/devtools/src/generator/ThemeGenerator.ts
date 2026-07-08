import * as fs from "fs";
import * as path from "path";

export class ThemeGenerator {
  public async generate(targetDir: string, themeName: string): Promise<boolean> {
    console.log(`Generating theme bundle: ${themeName}`);
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(targetDir, "theme.json"),
        JSON.stringify({
          name: themeName,
          colors: {
            primary: "#0070f3",
            background: "#ffffff"
          },
          typography: {
            fontFamily: "Inter"
          }
        }, null, 2)
      );

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
