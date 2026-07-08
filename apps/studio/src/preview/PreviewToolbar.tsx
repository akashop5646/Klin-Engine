import React from "react";

export const PreviewToolbar: React.FC = () => {
  return (
    <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem", borderBottom: "1px solid #eaeaea", backgroundColor: "#fff" }}>
      <button style={{ padding: "0.25rem 0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>Rotate Device</button>
      <button style={{ padding: "0.25rem 0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>Scale fit: 100%</button>
    </div>
  );
};
export default PreviewToolbar;
