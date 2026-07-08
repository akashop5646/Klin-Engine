import { Command } from "./Command";

export class CompletionCommand extends Command {
  public readonly name = "completion";
  public readonly description = "Generates autocompletion setup scripts for bash/zsh/powershell.";

  public async execute(args: string[], options: Record<string, any>): Promise<number> {
    console.log("# To enable autocompletions for Klin CLI, add this script hook to your shell profiles:");
    console.log("complete -C klin klin");
    return 0;
  }
}
