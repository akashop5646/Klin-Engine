import { sdkValidator } from "./validator";

export class KlinCliMock {
  /**
   * Mock CLI builder command compiling component packages.
   */
  public compileComponentPackage(componentJson: string): { success: boolean; log: string } {
    try {
      const def = JSON.parse(componentJson);
      const audit = sdkValidator.validateCustomComponent(def);
      if (!audit.valid) {
        return {
          success: false,
          log: `[Klin CLI SDK] Compilation Failed:\n` + audit.errors.map((e) => `- ${e}`).join("\n"),
        };
      }
      return {
        success: true,
        log: `[Klin CLI SDK] Compiled component "${def.type}" (v${def.version || "1.0.0"}) successfully into project package index.`,
      };
    } catch (e: any) {
      return { success: false, log: `[Klin CLI SDK] JSON Parse Error: ${e.message}` };
    }
  }
}

export const cliMock = new KlinCliMock();
