import React from "react";

export const RightSidebar: React.FC = () => {
  return (
    <div style={{ width: "240px", borderLeft: "1px solid #eaeaea", padding: "1rem", backgroundColor: "#fff", boxSizing: "border-box" }}>
      <h5 style={{ margin: "0 0 1rem 0", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>Properties Inspector</h5>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.85rem" }}>
        {/* Typography properties */}
        <div>
          <label style={{ fontWeight: "bold" }}>Typography</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.25rem", marginTop: "0.25rem" }}>
            <select style={{ padding: "0.25rem" }}><option>Inter</option></select>
            <select style={{ padding: "0.25rem" }}><option>Bold</option></select>
          </div>
        </div>

        {/* Layout & Spacing properties */}
        <div>
          <label style={{ fontWeight: "bold" }}>Spacing (Padding)</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.25rem", marginTop: "0.25rem" }}>
            <input type="text" value="16px" readOnly style={{ width: "100%", padding: "0.25rem" }} />
            <input type="text" value="16px" readOnly style={{ width: "100%", padding: "0.25rem" }} />
          </div>
        </div>

        {/* Colors presets */}
        <div>
          <label style={{ fontWeight: "bold" }}>Background Color</label>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.25rem" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "4px", backgroundColor: "#0070f3", border: "1px solid #ccc" }} />
            <span>#0070f3</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightSidebar;
