export class ApiRateLimiter {
  private _requests: Map<string, number> = new Map();

  public checkLimit(ip: string, limit: number = 100): boolean {
    const current = this._requests.get(ip) || 0;
    if (current >= limit) {
      return false; // Rate limit exceeded
    }
    this._requests.set(ip, current + 1);
    return true;
  }
}
