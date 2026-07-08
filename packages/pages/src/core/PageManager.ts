import type { PageDefinition } from "./PageDefinition";
import type { PageContext } from "./PageContext";
import { PageFactory, PageInstance } from "./PageFactory";
import { Result, Ok, Err } from "@klin/core";

export class PageManager {
  private factory = new PageFactory();
  private context: PageContext;
  private registeredPages: Map<string, PageDefinition> = new Map();
  private activeInstances: Map<string, PageInstance> = new Map();

  constructor(context: PageContext) {
    this.context = context;
  }

  create(definition: PageDefinition): Result<PageInstance, Error> {
    if (this.registeredPages.has(definition.manifest.id)) {
      return new Err(new Error(`Page already exists: ${definition.manifest.id}`));
    }
    
    this.registeredPages.set(definition.manifest.id, definition);
    const res = this.factory.createPage(definition, this.context);
    if (res.ok) {
      this.activeInstances.set(definition.manifest.id, res.value);
    }
    return res;
  }

  open(id: string): Result<PageInstance, Error> {
    const active = this.activeInstances.get(id);
    if (active) return new Ok(active);

    const definition = this.registeredPages.get(id);
    if (!definition) {
      return new Err(new Error(`Page definition not found: ${id}`));
    }

    const res = this.factory.createPage(definition, this.context);
    if (res.ok) {
      this.activeInstances.set(id, res.value);
    }
    return res;
  }

  duplicate(id: string, newId: string, newSlug: string): Result<PageInstance, Error> {
    const source = this.registeredPages.get(id);
    if (!source) {
      return new Err(new Error(`Source page definition not found: ${id}`));
    }

    const duplicateDef: PageDefinition = {
      ...source,
      manifest: {
        ...source.manifest,
        id: newId,
        slug: newSlug,
        title: `${source.manifest.title} (Copy)`,
      },
      route: {
        ...source.route,
        slug: newSlug,
        url: source.route.url.replace(source.route.slug, newSlug),
      },
      overrides: JSON.parse(JSON.stringify(source.overrides)),
    };

    return this.create(duplicateDef);
  }

  clone(id: string, targetId: string): Result<PageInstance, Error> {
    const source = this.registeredPages.get(id);
    if (!source) {
      return new Err(new Error(`Source page definition not found: ${id}`));
    }

    const cloneDef: PageDefinition = {
      ...source,
      manifest: {
        ...source.manifest,
        id: targetId,
      },
      overrides: JSON.parse(JSON.stringify(source.overrides)),
    };

    return this.create(cloneDef);
  }

  publish(id: string): Result<void, Error> {
    const instance = this.activeInstances.get(id);
    if (!instance) {
      return new Err(new Error(`Active page instance not found: ${id}`));
    }

    instance.lifecycle.transitionTo("Publishing");
    instance.updateState({
      isPublished: true,
      lastPublishedAt: Date.now(),
      isDirty: false,
    });
    instance.lifecycle.transitionTo("Ready");

    this.context.eventBus?.getPublisher().publish(
      "page.published",
      { pageId: id },
      "pages"
    );

    return new Ok(undefined);
  }

  archive(id: string): Result<void, Error> {
    const instance = this.activeInstances.get(id);
    if (!instance) {
      return new Err(new Error(`Active page instance not found: ${id}`));
    }

    instance.updateState({
      isArchived: true,
    });
    instance.lifecycle.transitionTo("Archived");

    this.context.eventBus?.getPublisher().publish(
      "page.archived",
      { pageId: id },
      "pages"
    );

    return new Ok(undefined);
  }

  restore(id: string): Result<void, Error> {
    const instance = this.activeInstances.get(id);
    if (!instance) {
      return new Err(new Error(`Active page instance not found: ${id}`));
    }

    instance.updateState({
      isArchived: false,
    });
    instance.lifecycle.transitionTo("Ready");

    this.context.eventBus?.getPublisher().publish(
      "page.restored",
      { pageId: id },
      "pages"
    );

    return new Ok(undefined);
  }

  delete(id: string): Result<void, Error> {
    const instance = this.activeInstances.get(id);
    if (instance) {
      instance.lifecycle.dispose();
      this.activeInstances.delete(id);
    }
    
    this.registeredPages.delete(id);
    this.context.eventBus?.getPublisher().publish(
      "page.deleted",
      { pageId: id },
      "pages"
    );

    return new Ok(undefined);
  }

  list(): PageDefinition[] {
    return Array.from(this.registeredPages.values());
  }

  find(id: string): PageDefinition | undefined {
    return this.registeredPages.get(id);
  }
}
