import React from "react";
import { registry } from "../core/registry";
import { themeResolver } from "../theme/resolver";
import { RenderingContext } from "../types/renderer";

interface KlinRendererProps {
  context: RenderingContext;
}

export const KlinRenderer: React.FC<KlinRendererProps> = ({ context }) => {
  const { designState, activePageId, options } = context;

  // Apply CSS variables dynamically to head or surrounding div
  const { cssVariables } = themeResolver.resolve(designState.theme);

  const page = designState.pages.find((p) => p.id === activePageId || p.slug === activePageId);
  if (!page) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#ef4444" }}>
        <h3>Error: Page not found</h3>
        <p>The page "{activePageId}" was not found in the template layout.</p>
      </div>
    );
  }

  return (
    <div
      className="klin-storefront-wrapper"
      style={cssVariables as React.CSSProperties}
    >
      {page.sections
        .filter((sec) => sec.isVisible !== false)
        .map((sec) => {
          const compDef = registry.getComponent(sec.type);

          if (!compDef) {
            return (
              <div
                key={sec.id}
                style={{
                  padding: "20px",
                  border: "1px dashed #ef4444",
                  margin: "10px",
                  textAlign: "center",
                  color: "#ef4444",
                  fontSize: "12px",
                }}
              >
                Missing Component: "{sec.type}" (id: {sec.id})
              </div>
            );
          }

          const RenderComponent = compDef.schema.render;

          // Wrap element for editor highlighting when in preview mode
          if (options.isPreview) {
            const isSelected = options.activeSectionId === sec.id;
            return (
              <div
                key={sec.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (options.onSectionClick) {
                    options.onSectionClick(sec.id);
                  }
                }}
                style={{
                  position: "relative",
                  outline: isSelected ? "2px solid #6366f1" : "none",
                  cursor: "pointer",
                }}
                className={`klin-preview-section ${isSelected ? "klin-section-selected" : ""}`}
              >
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "#6366f1",
                      color: "white",
                      fontSize: "10px",
                      padding: "2px 6px",
                      zIndex: 50,
                      pointerEvents: "none",
                    }}
                  >
                    {compDef.label}
                  </div>
                )}
                <RenderComponent {...sec.props} />
              </div>
            );
          }

          return <RenderComponent key={sec.id} {...sec.props} />;
        })}
    </div>
  );
};
