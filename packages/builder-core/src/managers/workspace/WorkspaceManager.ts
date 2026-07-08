import { BuilderStore } from "../../state/BuilderStore";
import { EventService } from "../../services/EventService";

export class WorkspaceManager {
  private store: BuilderStore;
  private eventService: EventService;

  constructor(store: BuilderStore, eventService: EventService) {
    this.store = store;
    this.eventService = eventService;
  }

  setWorkspace(workspaceId: string) {
    this.store.update({ workspaceId });
  }

  setProject(projectId: string) {
    this.store.update({ projectId });
    this.eventService.publish("builder.project.loaded", { projectId });
  }

  setActivePage(pageId: string) {
    this.store.update({ activePage: pageId });
  }

  setLocale(locale: string) {
    this.store.update({ locale });
  }
}
