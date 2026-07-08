import React from "react";

export const PagesManager: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5 style={{ margin: "0 0 0.5rem 0" }}>Pages & Routes Settings</h5>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🏠 /home (Homepage, Draft)</li>
        <li>ℹ /about (Published)</li>
        <li>✉ /contact (Published)</li>
      </ul>
      <button style={{ padding: "0.25rem 0.5rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}>
        Add Page Route
      </button>
    </div>
  );
};
export default PagesManager;
