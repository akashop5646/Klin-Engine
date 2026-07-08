import React from "react";

export const ComponentLibrary: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5 style={{ margin: "0 0 0.5rem 0" }}>Component Library Symbols</h5>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ border: "1px solid #cbd5e0", padding: "0.5rem", borderRadius: "4px", backgroundColor: "#fff" }}>
          <strong>❖ Global Header Navbar</strong>
          <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.75rem", color: "#718096" }}>Edits sync everywhere.</p>
        </div>
        <div style={{ border: "1px solid #cbd5e0", padding: "0.5rem", borderRadius: "4px", backgroundColor: "#fff" }}>
          <strong>❖ Global Footer Block</strong>
          <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.75rem", color: "#718096" }}>Edits sync everywhere.</p>
        </div>
      </div>
    </div>
  );
};
export default ComponentLibrary;
