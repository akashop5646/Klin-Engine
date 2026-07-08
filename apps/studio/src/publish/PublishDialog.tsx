import React, { useState } from "react";

export const PublishDialog: React.FC = () => {
  const [deploying, setDeploying] = useState(false);
  const [url, setUrl] = useState("");

  const handlePublish = async () => {
    setDeploying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDeploying(false);
    setUrl("https://my-app.klin.site");
  };

  return (
    <div style={{ maxWidth: "450px", margin: "2rem auto", padding: "1.5rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h4>Publish Website Snapshot</h4>
      <p style={{ fontSize: "0.85rem", color: "#4a5568" }}>
        This compiles layout components, updates CDN nodes, and provisions your subdomain.
      </p>

      {deploying ? (
        <div style={{ padding: "1rem 0", color: "#0070f3", fontWeight: "bold" }}>Uploading compile bundle...</div>
      ) : url ? (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#10b981", fontWeight: "bold" }}>✔ Published Successfully!</p>
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
        </div>
      ) : (
        <button onClick={handlePublish} style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
          Deploy Now
        </button>
      )}
    </div>
  );
};
export default PublishDialog;
