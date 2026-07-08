import { WorkspaceManager } from "../managers/workspace/WorkspaceManager";

export class WorkspaceAPI {
  private manager: WorkspaceManager;

  constructor(manager: WorkspaceManager) {
    this.manager = manager;
  }

  setWorkspace(workspaceId: string) {
    this.manager.setWorkspace(workspaceId);
  }

  setProject(projectId: string) {
    this.manager.setProject(projectId);
  }

  setActivePage(pageId: string) {
    this.manager.setActivePage(pageId);
  }
}
