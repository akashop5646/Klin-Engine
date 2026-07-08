import React from "react";

export const UploadDialog: React.FC = () => {
  return (
    <div style={{ border: "2px dashed #ccc", padding: "1.5rem", textAlign: "center", borderRadius: "6px" }}>
      <p style={{ margin: 0, fontSize: "0.85rem" }}>Drag and drop assets files or click to upload</p>
    </div>
  );
};
export default UploadDialog;
