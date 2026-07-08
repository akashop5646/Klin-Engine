import type { ValidationReport } from "../runtime/PageValidator";

export class ValidationCache {
  private cache: Map<string, { report: ValidationReport; timestamp: number }> = new Map();

  get(pageId: string, version: string): ValidationReport | undefined {
    const key = `${pageId}:${version}`;
    return this.cache.get(key)?.report;
  }

  set(pageId: string, version: string, report: ValidationReport): void {
    const key = `${pageId}:${version}`;
    this.cache.set(key, { report, timestamp: Date.now() });
  }

  delete(pageId: string, version: string): void {
    const key = `${pageId}:${version}`;
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
