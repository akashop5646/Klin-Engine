import React from "react";

export const SettingsManager: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem", padding: "1rem" }}>
      <h4>Project Settings</h4>
      <div style={{ marginBottom: "1rem" }}>
        <label>Custom Domain Binding</label>
        <input type="text" placeholder="e.g. www.mycompany.com" style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>SEO Site Title Description</label>
        <textarea placeholder="Site metadata..." style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }} />
      </div>
      <div style={{ borderTop: "1px solid #fee2e2", paddingTop: "1rem", marginTop: "2rem" }}>
        <h5 style={{ color: "#dc2626", margin: "0 0 0.5rem 0" }}>Danger Zone</h5>
        <button style={{ padding: "0.5rem 1rem", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Delete Website Instance
        </button>
      </div>
    </div>
  );
};
export default SettingsManager;
