export interface CommandOption {
  name: string;
  alias?: string;
  description: string;
  type: "string" | "boolean" | "number";
  default?: any;
}

export abstract class Command {
  public abstract readonly name: string;
  public readonly aliases: string[] = [];
  public abstract readonly description: string;
  public readonly options: CommandOption[] = [];

  public abstract execute(args: string[], options: Record<string, any>): Promise<number>;
}
