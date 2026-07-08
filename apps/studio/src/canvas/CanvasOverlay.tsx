import React from "react";

export const CanvasOverlay: React.FC = () => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <div style={{ border: "2px solid #0070f3", position: "absolute", top: "10%", left: "10%", width: "80%", height: "80%" }}>
        <span style={{ position: "absolute", top: "-22px", left: "0", backgroundColor: "#0070f3", color: "#fff", padding: "2px 6px", fontSize: "0.7rem", borderRadius: "3px" }}>
          Section Box Guide
        </span>
      </div>
    </div>
  );
};
export default CanvasOverlay;
