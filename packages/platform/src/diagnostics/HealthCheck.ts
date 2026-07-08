export class HealthCheck {
  public checkMemoryUsage(): number {
    return 120 * 1024 * 1024; // 120MB mocked
  }
}
