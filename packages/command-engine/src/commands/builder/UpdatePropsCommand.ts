import { Command } from "../Command";
import { CommandContext } from "../../core/CommandContext";
import { Result, Ok, generateId } from "@klin/core";

export class UpdatePropsCommand implements Command {
  readonly id = generateId("pkg");
  readonly name = "builder.props.update";
  private payload: { nodeId: string; props: Record<string, any> };
  private oldProps: Record<string, any> = {};

  constructor(payload: { nodeId: string; props: Record<string, any> }) {
    this.payload = payload;
  }

  async validate(_context: CommandContext): Promise<Result<void, Error>> {
    return new Ok<void, Error>(undefined);
  }

  async execute(context: CommandContext): Promise<Result<void, Error>> {
    const node = context.state.layout.root.find((n: any) => n.id === this.payload.nodeId);
    if (node) {
      this.oldProps = { ...node.props };
      node.props = { ...node.props, ...this.payload.props };
    }
    return new Ok<void, Error>(undefined);
  }

  async undo(context: CommandContext): Promise<Result<void, Error>> {
    const node = context.state.layout.root.find((n: any) => n.id === this.payload.nodeId);
    if (node) {
      node.props = this.oldProps;
    }
    return new Ok<void, Error>(undefined);
  }
}
