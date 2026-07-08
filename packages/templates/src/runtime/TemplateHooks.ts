import type { TemplateLifecycleState } from "../core/TemplateLifecycle";

export type TemplateHookFn = (context: TemplateHookContext) => Promise<void> | void;

export interface TemplateHookContext {
  templateId: string;
  state: TemplateLifecycleState;
  metadata: Record<string, unknown>;
}

export type TemplateHookName =
  | "beforeLoad"
  | "afterLoad"
  | "beforeMount"
  | "afterMount"
  | "beforeUpdate"
  | "afterUpdate"
  | "beforeDispose"
  | "afterDispose"
  | "beforeSerialize"
  | "afterSerialize"
  | "beforeMigrate"
  | "afterMigrate";

export class TemplateHooks {
  private hooks: Map<TemplateHookName, Set<TemplateHookFn>> = new Map();

  register(name: TemplateHookName, fn: TemplateHookFn): () => void {
    if (!this.hooks.has(name)) {
      this.hooks.set(name, new Set());
    }
    this.hooks.get(name)!.add(fn);
    return () => {
      this.hooks.get(name)?.delete(fn);
    };
  }

  async run(name: TemplateHookName, context: TemplateHookContext): Promise<void> {
    const fns = this.hooks.get(name);
    if (!fns) return;

    for (const fn of fns) {
      try {
        await fn(context);
      } catch (err) {
        console.error(`TemplateHook [${name}] error:`, err);
      }
    }
  }

  clear(name?: TemplateHookName) {
    if (name) {
      this.hooks.delete(name);
    } else {
      this.hooks.clear();
    }
  }
}
