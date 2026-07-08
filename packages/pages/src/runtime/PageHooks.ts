import type { PageLifecycleState } from "../core/PageLifecycle";

export type PageHookFn = (context: PageHookContext) => Promise<void> | void;

export interface PageHookContext {
  pageId: string;
  state: PageLifecycleState;
  metadata: Record<string, unknown>;
}

export type PageHookName =
  | "beforeCreate"
  | "afterCreate"
  | "beforeSave"
  | "afterSave"
  | "beforePublish"
  | "afterPublish"
  | "beforeDelete"
  | "afterDelete";

export class PageHooks {
  private hooks: Map<PageHookName, Set<PageHookFn>> = new Map();

  register(name: PageHookName, fn: PageHookFn): () => void {
    if (!this.hooks.has(name)) {
      this.hooks.set(name, new Set());
    }
    this.hooks.get(name)!.add(fn);
    return () => {
      this.hooks.get(name)?.delete(fn);
    };
  }

  async run(name: PageHookName, context: PageHookContext): Promise<void> {
    const fns = this.hooks.get(name);
    if (!fns) return;

    for (const fn of fns) {
      try {
        await fn(context);
      } catch (err) {
        console.error(`PageHook [${name}] error:`, err);
      }
    }
  }

  clear(name?: PageHookName) {
    if (name) {
      this.hooks.delete(name);
    } else {
      this.hooks.clear();
    }
  }
}
