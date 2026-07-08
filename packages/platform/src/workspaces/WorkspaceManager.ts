import { Workspace } from "./Workspace";

export class WorkspaceManager {
  private _workspaces: Map<string, Workspace> = new Map();

  public createWorkspace(name: string): Workspace {
    const id = "ws-" + Math.random().toString(36).substring(2, 9);
    const workspace = new Workspace(id, name);
    this._workspaces.set(id, workspace);
    return workspace;
  }

  public deleteWorkspace(id: string): void {
    this._workspaces.delete(id);
  }

  public invite(workspaceId: string, email: string): void {
    const ws = this._workspaces.get(workspaceId);
    if (ws) {
      ws.users.push(email);
    }
  }
}
