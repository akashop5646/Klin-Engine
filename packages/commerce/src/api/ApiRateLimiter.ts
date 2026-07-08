export class ApiRateLimiter {
  private _calls: Map<string, number> = new Map();

  public isRateLimited(clientIp: string): boolean {
    const current = this._calls.get(clientIp) || 0;
    if (current > 100) return true; // Limit exceeded
    this._calls.set(clientIp, current + 1);
    return false;
  }
}
