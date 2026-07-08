import React from "react";
import { RendererAdapter } from "./RendererAdapter";
import { Registry } from "@klin/registry";

export class ReactRenderer implements RendererAdapter {
  private registry: Registry;

  constructor(registry: Registry) {
    this.registry = registry;
  }

  render(componentId: string, props: any): any {
    // Check dynamic registration map
    const componentMap = (globalThis as any).__KLIN_COMPONENTS__ || {};
    const ComponentClass = componentMap[componentId];

    if (ComponentClass) {
      return React.createElement(ComponentClass, props);
    }

    // Fallback for button if not registered globally yet
    if (componentId === "klin-button" || componentId === "Button") {
      try {
        // Statically fallback to @klin/ui Button
        const { Button } = require("@klin/ui");
        return React.createElement(Button, props);
      } catch (err) {
        // Fallback placeholder
      }
    }

    return React.createElement(
      "div",
      {
        style: {
          padding: "16px",
          border: "1px dashed #ccc",
          borderRadius: "4px",
          color: "#666",
          fontSize: "12px",
          fontFamily: "monospace",
        },
      },
      `[Component: ${componentId}]`
    );
  }

  renderHTML(componentId: string, props: any): string {
    const componentMap = (globalThis as any).__KLIN_COMPONENTS__ || {};
    const ComponentClass = componentMap[componentId];

    if (ComponentClass && typeof ComponentClass.renderHTML === "function") {
      return ComponentClass.renderHTML(props);
    }

    if (componentId === "klin-button" || componentId === "Button") {
      return `<button class="klin-btn">${props.text || "Button"}</button>`;
    }

    return `<div class="klin-component" data-id="${componentId}"></div>`;
  }
}
