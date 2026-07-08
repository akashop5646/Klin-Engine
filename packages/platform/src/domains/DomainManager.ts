export class DomainManager {
  private _domains: Map<string, string[]> = new Map();

  public associateDomain(projectId: string, domain: string): void {
    if (!this._domains.has(projectId)) {
      this._domains.set(projectId, []);
    }
    this._domains.get(projectId)!.push(domain);
  }

  public getDomains(projectId: string): string[] {
    return this._domains.get(projectId) || [];
  }
}
