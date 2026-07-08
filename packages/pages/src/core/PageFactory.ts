import type { PageContext } from "./PageContext";
import type { PageDefinition } from "./PageDefinition";
import { PageLifecycle } from "./PageLifecycle";
import { PageState, createDefaultPageState } from "./PageState";
import { Result, Ok, Err } from "@klin/core";

export class PageInstance {
  readonly definition: PageDefinition;
  readonly context: PageContext;
  readonly lifecycle = new PageLifecycle();
  private state: PageState;

  constructor(definition: PageDefinition, context: PageContext) {
    this.definition = definition;
    this.context = context;
    this.state = createDefaultPageState();
  }

  getState(): PageState {
    return this.state;
  }

  updateState(partialState: Partial<PageState>) {
    this.state = {
      ...this.state,
      ...partialState,
    };
    this.context.eventBus?.getPublisher().publish(
      "page.updated",
      { pageId: this.definition.manifest.id, state: this.state },
      "pages"
    );
  }
}

export class PageFactory {
  createPage(definition: PageDefinition, context: PageContext): Result<PageInstance, Error> {
    try {
      const instance = new PageInstance(definition, context);
      instance.lifecycle.transitionTo("Ready");
      context.eventBus?.getPublisher().publish(
        "page.created",
        { pageId: definition.manifest.id },
        "pages"
      );
      return new Ok(instance);
    } catch (err) {
      return new Err(err as Error);
    }
  }
}
