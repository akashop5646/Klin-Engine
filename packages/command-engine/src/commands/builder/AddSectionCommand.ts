import { Command } from "../Command";
import { CommandContext } from "../../core/CommandContext";
import { Result, Ok, generateId } from "@klin/core";

export class AddSectionCommand implements Command {
  readonly id = generateId("pkg");
  readonly name = "builder.section.add";
  private payload: { blockId: string; index: number };
  private addedSectionId: string | null = null;

  constructor(payload: { blockId: string; index: number }) {
    this.payload = payload;
  }

  async validate(_context: CommandContext): Promise<Result<void, Error>> {
    return new Ok<void, Error>(undefined);
  }

  async execute(context: CommandContext): Promise<Result<string, Error>> {
    this.addedSectionId = generateId("blk");
    context.state.layout.root.splice(this.payload.index, 0, {
      id: this.addedSectionId,
      type: this.payload.blockId,
      props: {},
    });
    return new Ok<string, Error>(this.addedSectionId);
  }

  async undo(context: CommandContext): Promise<Result<void, Error>> {
    if (this.addedSectionId) {
      const idx = context.state.layout.root.findIndex((n: any) => n.id === this.addedSectionId);
      if (idx !== -1) {
        context.state.layout.root.splice(idx, 1);
      }
    }
    return new Ok<void, Error>(undefined);
  }
}
