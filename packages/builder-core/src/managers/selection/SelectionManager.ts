import { BuilderStore } from "../../state/BuilderStore";
import { EventService } from "../../services/EventService";

export class SelectionManager {
  private store: BuilderStore;
  private eventService: EventService;

  constructor(store: BuilderStore, eventService: EventService) {
    this.store = store;
    this.eventService = eventService;
  }

  select(nodeIds: string[] | null) {
    this.store.update({
      selection: {
        selectedNodeIds: nodeIds,
        hoveredNodeId: this.store.getState().selection.hoveredNodeId,
      },
    });
    this.eventService.publish("builder.selection.changed", { selectedNodeIds: nodeIds });
  }

  hover(nodeId: string | null) {
    this.store.update({
      selection: {
        selectedNodeIds: this.store.getState().selection.selectedNodeIds,
        hoveredNodeId: nodeId,
      },
    });
  }

  clear() {
    this.select(null);
    this.hover(null);
  }
}
