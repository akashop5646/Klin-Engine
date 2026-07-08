import { BuilderContext } from "../core/BuilderContext";
import { EditorState } from "../state/EditorState";
import { CommandBridge } from "../commands/CommandBridge";
import { SelectionManager } from "./SelectionManager";

export class RuntimeBridge {
  readonly context: BuilderContext;
  readonly editorState: EditorState;
  readonly commandBridge: CommandBridge;
  readonly selectionManager: SelectionManager;

  constructor(context: BuilderContext, editorState: EditorState) {
    this.context = context;
    this.editorState = editorState;
    this.commandBridge = new CommandBridge(context.commandEngine);
    this.selectionManager = new SelectionManager(editorState);
  }

  async handleSectionAdded(blockId: string, index: number) {
    const res = await this.commandBridge.addSection(blockId, index);
    if (res.ok) {
      const newSectionId = res.value;
      this.selectionManager.select([newSectionId]);
      await this.context.eventBus.getPublisher().publish(
        "builder.component.added",
        { sectionId: newSectionId, blockId },
        "builder"
      );
    }
  }

  async handleSectionDeleted(sectionId: string) {
    const res = await this.commandBridge.deleteSection(sectionId);
    if (res.ok) {
      this.selectionManager.clear();
      await this.context.eventBus.getPublisher().publish(
        "builder.component.deleted",
        { sectionId },
        "builder"
      );
    }
  }

  async handleSectionMoved(sectionId: string, newIndex: number) {
    const res = await this.commandBridge.moveSection(sectionId, newIndex);
    if (res.ok) {
      await this.context.eventBus.getPublisher().publish(
        "builder.component.moved",
        { sectionId, newIndex },
        "builder"
      );
    }
  }

  async handlePropsUpdated(sectionId: string, props: Record<string, any>) {
    const res = await this.commandBridge.updateSectionProps(sectionId, props);
    if (res.ok) {
      await this.context.eventBus.getPublisher().publish(
        "builder.component.updated",
        { sectionId, props },
        "builder"
      );
    }
  }
}
