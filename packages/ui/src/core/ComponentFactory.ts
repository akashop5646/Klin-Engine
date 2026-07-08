/**
 * Component Factory — creates component instances with injected context,
 * validates manifests, and wires theme resolution.
 */

import { ComponentContext, defaultComponentContext } from "./ComponentContext";
import { ComponentLifecycle } from "./ComponentLifecycle";
import type { ComponentManifest } from "../contracts/ComponentManifest";

export interface ComponentInstance {
  manifest: ComponentManifest;
  context: ComponentContext;
  lifecycle: ComponentLifecycle;
}

export class ComponentFactory {
  /**
   * Create a component instance with validated manifest and injected context.
   */
  static create(
    manifest: ComponentManifest,
    contextOverrides?: Partial<ComponentContext>
  ): ComponentInstance {
    const lifecycle = new ComponentLifecycle();
    lifecycle.transitionTo("Loading");

    const context: ComponentContext = {
      ...defaultComponentContext,
      ...contextOverrides,
    };

    lifecycle.transitionTo("Validating");

    if (!manifest.id || !manifest.name || !manifest.version) {
      throw new Error(
        `Invalid manifest: id, name, and version are required. Got id="${manifest.id}", name="${manifest.name}", version="${manifest.version}"`
      );
    }

    lifecycle.transitionTo("ResolvingTheme");

    return {
      manifest,
      context,
      lifecycle,
    };
  }
}
