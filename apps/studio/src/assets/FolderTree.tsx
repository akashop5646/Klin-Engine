import React from "react";

export const FolderTree: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem", color: "#4a5568" }}>
      <div>📁 Root</div>
      <div style={{ paddingLeft: "1rem" }}>📁 Images</div>
      <div style={{ paddingLeft: "1rem" }}>📁 Fonts</div>
    </div>
  );
};
export default FolderTree;
