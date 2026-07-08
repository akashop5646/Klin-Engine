import React from "react";

export const AssetGrid: React.FC = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "0.5rem" }}>
      {["logo.png", "hero-bg.webp", "avatar.jpg"].map((item) => (
        <div key={item} style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "0.25rem", textAlign: "center", fontSize: "0.75rem" }}>
          <div style={{ height: "40px", backgroundColor: "#f3f4f6", marginBottom: "0.25rem" }} />
          {item}
        </div>
      ))}
    </div>
  );
};
export default AssetGrid;
