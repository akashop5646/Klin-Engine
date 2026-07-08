import { RenderTreeCache } from "./RenderTreeCache";
import { DependencyCache } from "./DependencyCache";
import { ValidationCache } from "./ValidationCache";
import type { RenderTree } from "../render-tree/RenderTree";
import type { ResolvedDependencies } from "../composition/PageDependencyResolver";
import type { ValidationReport } from "../runtime/PageValidator";

export class PipelineCache {
  readonly renderTreeCache = new RenderTreeCache();
  readonly dependencyCache = new DependencyCache();
  readonly validationCache = new ValidationCache();

  getRenderTree(pageId: string, version: string): RenderTree | undefined {
    return this.renderTreeCache.get(pageId, version);
  }

  setRenderTree(pageId: string, version: string, tree: RenderTree): void {
    this.renderTreeCache.set(pageId, version, tree);
  }

  getDependencies(pageId: string, version: string): ResolvedDependencies | undefined {
    return this.dependencyCache.get(pageId, version);
  }

  setDependencies(pageId: string, version: string, dependencies: ResolvedDependencies): void {
    this.dependencyCache.set(pageId, version, dependencies);
  }

  getValidationReport(pageId: string, version: string): ValidationReport | undefined {
    return this.validationCache.get(pageId, version);
  }

  setValidationReport(pageId: string, version: string, report: ValidationReport): void {
    this.validationCache.set(pageId, version, report);
  }

  invalidate(pageId: string, version: string): void {
    this.renderTreeCache.delete(pageId, version);
    this.dependencyCache.delete(pageId, version);
    this.validationCache.delete(pageId, version);
  }

  clear(): void {
    this.renderTreeCache.clear();
    this.dependencyCache.clear();
    this.validationCache.clear();
  }
}
