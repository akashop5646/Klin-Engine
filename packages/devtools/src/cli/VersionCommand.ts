import { Command } from "./Command";

export class VersionCommand extends Command {
  public readonly name = "version";
  public readonly aliases = ["-v", "--version"];
  public readonly description = "Displays current version of Klin DevTools CLI.";

  public async execute(args: string[], options: Record<string, any>): Promise<number> {
    console.log("Klin Developer Tools Engine v1.0.0");
    return 0;
  }
}
