import React from "react";

export const SelectionLayer: React.FC = () => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <div style={{ border: "2px dashed #10b981", position: "absolute", top: "20%", left: "20%", width: "60%", height: "60%" }}>
        <span style={{ position: "absolute", top: "-22px", left: "0", backgroundColor: "#10b981", color: "#fff", padding: "2px 6px", fontSize: "0.7rem", borderRadius: "3px" }}>
          Selected: Container
        </span>
      </div>
    </div>
  );
};
export default SelectionLayer;
