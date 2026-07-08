import React from "react";

export const PublishProgress: React.FC = () => {
  return (
    <div style={{ padding: "0.5rem", fontSize: "0.8rem", color: "#4a5568" }}>
      <div>Saving layout snapshot... ✔</div>
      <div>Invoking Renderer engine... ✔</div>
      <div>Uploading CDN bundles... [/]</div>
    </div>
  );
};
export default PublishProgress;
