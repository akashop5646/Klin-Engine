import { Command } from "../Command";
import { CommandContext } from "../../core/CommandContext";
import { Result, Ok, generateId } from "@klin/core";

export class MoveSectionCommand implements Command {
  readonly id = generateId("pkg");
  readonly name = "builder.section.move";
  private payload: { sectionId: string; newIndex: number };
  private oldIndex: number = -1;

  constructor(payload: { sectionId: string; newIndex: number }) {
    this.payload = payload;
  }

  async validate(_context: CommandContext): Promise<Result<void, Error>> {
    return new Ok<void, Error>(undefined);
  }

  async execute(context: CommandContext): Promise<Result<void, Error>> {
    const idx = context.state.layout.root.findIndex((n: any) => n.id === this.payload.sectionId);
    if (idx !== -1) {
      this.oldIndex = idx;
      const [node] = context.state.layout.root.splice(idx, 1);
      context.state.layout.root.splice(this.payload.newIndex, 0, node);
    }
    return new Ok<void, Error>(undefined);
  }

  async undo(context: CommandContext): Promise<Result<void, Error>> {
    if (this.oldIndex !== -1) {
      const idx = context.state.layout.root.findIndex((n: any) => n.id === this.payload.sectionId);
      if (idx !== -1) {
        const [node] = context.state.layout.root.splice(idx, 1);
        context.state.layout.root.splice(this.oldIndex, 0, node);
      }
    }
    return new Ok<void, Error>(undefined);
  }
}
