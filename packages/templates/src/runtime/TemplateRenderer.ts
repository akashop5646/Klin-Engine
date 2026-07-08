import React from "react";
import { TemplateInstance } from "../core/TemplateFactory";

export interface TemplateRendererProps {
  instance: TemplateInstance;
}

export class TemplateRenderer {
  render(instance: TemplateInstance): React.ReactElement {
    instance.lifecycle.transitionTo("Rendering");

    instance.context.eventBus.getPublisher().publish("template.rendered", { templateId: instance.manifest.id }, "templates");

    const layoutNodes = instance.getLayout();

    return React.createElement(
      "div",
      {
        id: `template-${instance.manifest.id}`,
        className: "template-layout-container",
        style: { display: "flex", flexDirection: "column", gap: "1rem" },
      },
      layoutNodes.map((node, index) =>
        React.createElement(
          "div",
          {
            key: node.id || `node-${index}`,
            "data-block-id": node.blockId,
            className: "template-section-node",
          },
          React.createElement("div", { className: "section-block-label" }, `Block: ${node.blockId}`),
          React.createElement("pre", null, JSON.stringify(node.properties, null, 2))
        )
      )
    );
  }
}
