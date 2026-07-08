export class UsageManager {
  private _bandwidth: Map<string, number> = new Map();
  private _storage: Map<string, number> = new Map();

  public logBandwidth(workspaceId: string, bytes: number): void {
    const current = this._bandwidth.get(workspaceId) || 0;
    this._bandwidth.set(workspaceId, current + bytes);
  }

  public logStorage(workspaceId: string, bytes: number): void {
    const current = this._storage.get(workspaceId) || 0;
    this._storage.set(workspaceId, current + bytes);
  }

  public getBandwidth(workspaceId: string): number {
    return this._bandwidth.get(workspaceId) || 0;
  }

  public getStorage(workspaceId: string): number {
    return this._storage.get(workspaceId) || 0;
  }
}
