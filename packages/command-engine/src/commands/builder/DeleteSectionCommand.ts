import { Command } from "../Command";
import { CommandContext } from "../../core/CommandContext";
import { Result, Ok, generateId } from "@klin/core";

export class DeleteSectionCommand implements Command {
  readonly id = generateId("pkg");
  readonly name = "builder.section.delete";
  private payload: { sectionId: string };
  private deletedNode: any | null = null;
  private deletedIndex: number = -1;

  constructor(payload: { sectionId: string }) {
    this.payload = payload;
  }

  async validate(_context: CommandContext): Promise<Result<void, Error>> {
    return new Ok<void, Error>(undefined);
  }

  async execute(context: CommandContext): Promise<Result<void, Error>> {
    const idx = context.state.layout.root.findIndex((n: any) => n.id === this.payload.sectionId);
    if (idx !== -1) {
      this.deletedIndex = idx;
      this.deletedNode = context.state.layout.root[idx];
      context.state.layout.root.splice(idx, 1);
    }
    return new Ok<void, Error>(undefined);
  }

  async undo(context: CommandContext): Promise<Result<void, Error>> {
    if (this.deletedNode && this.deletedIndex !== -1) {
      context.state.layout.root.splice(this.deletedIndex, 0, this.deletedNode);
    }
    return new Ok<void, Error>(undefined);
  }
}
