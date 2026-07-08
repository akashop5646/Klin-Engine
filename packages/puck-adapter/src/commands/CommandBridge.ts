import { CommandEngine } from "@klin/command-engine";
import {
  AddSectionCommand,
  DeleteSectionCommand,
  MoveSectionCommand,
  UpdatePropsCommand,
} from "@klin/command-engine";
import { Result } from "@klin/core";

export class CommandBridge {
  private commandEngine: CommandEngine;

  constructor(commandEngine: CommandEngine) {
    this.commandEngine = commandEngine;
  }

  async addSection(blockId: string, index: number): Promise<Result<any, Error>> {
    const cmd = new AddSectionCommand({ blockId, index });
    return this.commandEngine.execute(cmd);
  }

  async deleteSection(sectionId: string): Promise<Result<any, Error>> {
    const cmd = new DeleteSectionCommand({ sectionId });
    return this.commandEngine.execute(cmd);
  }

  async moveSection(sectionId: string, newIndex: number): Promise<Result<any, Error>> {
    const cmd = new MoveSectionCommand({ sectionId, newIndex });
    return this.commandEngine.execute(cmd);
  }

  async updateSectionProps(nodeId: string, props: Record<string, any>): Promise<Result<any, Error>> {
    const cmd = new UpdatePropsCommand({ nodeId, props });
    return this.commandEngine.execute(cmd);
  }
}
