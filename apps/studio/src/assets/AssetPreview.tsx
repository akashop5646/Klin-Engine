import React from "react";

export const AssetPreview: React.FC = () => {
  return (
    <div style={{ fontSize: "0.8rem", color: "#4a5568" }}>
      <strong>File: logo.png</strong><br/>
      Size: 24KB<br/>
      Dimension: 512 x 512px
    </div>
  );
};
export default AssetPreview;
