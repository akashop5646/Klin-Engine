import React from "react";
import { BlockInstance } from "../core/BlockFactory";

export interface BlockRendererProps {
  instance: BlockInstance;
}

export class BlockRenderer {
  render(instance: BlockInstance, customRenderFn?: (props: any) => React.ReactElement): React.ReactElement {
    instance.lifecycle.transitionTo("Rendering");
    
    // Fire event bus rendered signal
    instance.context.eventBus.getPublisher().publish("block.rendered", { blockId: instance.manifest.id }, "blocks");

    if (customRenderFn) {
      return customRenderFn(instance.getProperties());
    }

    // Default container layout rendering fallback
    return React.createElement(
      "section",
      {
        id: instance.manifest.id,
        "data-block-category": instance.manifest.category,
        style: { padding: "2rem", width: "100%" },
      },
      React.createElement("h2", null, instance.manifest.name),
      React.createElement("pre", null, JSON.stringify(instance.getProperties(), null, 2))
    );
  }
}
