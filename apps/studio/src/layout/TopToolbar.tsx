import React from "react";

interface TopToolbarProps {
  siteId: string;
  onSave: () => void;
  onPublish: () => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({ siteId, onSave, onPublish }) => {
  return (
    <div style={{
      height: "50px",
      borderBottom: "1px solid #eaeaea",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 1.5rem",
      boxSizing: "border-box"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button onClick={() => window.location.hash = "/dashboard"} style={{ border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "1.1rem" }}>
          ◀ Back
        </button>
        <span style={{ fontWeight: "bold" }}>Studio: {siteId}</span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button style={{ padding: "0.4rem 0.8rem", backgroundColor: "#f3f4f6", border: "none", borderRadius: "4px" }}>Undo</button>
        <button style={{ padding: "0.4rem 0.8rem", backgroundColor: "#f3f4f6", border: "none", borderRadius: "4px" }}>Redo</button>
        <span style={{ borderLeft: "1px solid #ddd", margin: "0 0.5rem" }} />
        <button style={{ padding: "0.4rem 0.8rem", backgroundColor: "#f3f4f6", border: "none", borderRadius: "4px" }}>100%</button>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={onSave} style={{ padding: "0.4rem 1rem", backgroundColor: "#f3f4f6", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Save
        </button>
        <button onClick={onPublish} style={{ padding: "0.4rem 1rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Publish
        </button>
      </div>
    </div>
  );
};
export default TopToolbar;
