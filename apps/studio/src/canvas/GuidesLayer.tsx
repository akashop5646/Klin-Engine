import React from "react";

export const GuidesLayer: React.FC = () => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {/* Vertically aligning guide ruler line */}
      <div style={{ width: "1px", height: "100%", backgroundColor: "#f56565", position: "absolute", left: "50%", opacity: 0.6 }} />
    </div>
  );
};
export default GuidesLayer;
