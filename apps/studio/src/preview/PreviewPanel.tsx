import React, { useState } from "react";

export const PreviewPanel: React.FC = () => {
  const [mode, setMode] = useState<"Desktop" | "Tablet" | "Mobile">("Desktop");
  const [engineMode, setEngineMode] = useState<"SSR" | "CSR" | "SEO">("SSR");

  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "1rem", marginBottom: "1rem" }}>
        <h3>Breakpoint Viewport Preview</h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["Desktop", "Tablet", "Mobile"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              style={{
                padding: "0.4rem 0.8rem",
                backgroundColor: mode === m ? "#0070f3" : "#eaeaea",
                color: mode === m ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", fontSize: "0.85rem" }}>
        <span><strong>Preview Engine:</strong></span>
        {["SSR", "CSR", "SEO"].map((em) => (
          <label key={em} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            <input type="radio" checked={engineMode === em} onChange={() => setEngineMode(em as any)} />
            {em} Mode
          </label>
        ))}
      </div>

      <div style={{
        margin: "0 auto",
        width: mode === "Desktop" ? "100%" : mode === "Tablet" ? "600px" : "360px",
        minHeight: "400px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        transition: "width 0.3s ease",
        padding: "1rem"
      }}>
        <h4>Rendered Preview ({mode} Viewport)</h4>
        <p>This layout preview utilizes Renderer engine client settings.</p>
      </div>
    </div>
  );
};
export default PreviewPanel;
