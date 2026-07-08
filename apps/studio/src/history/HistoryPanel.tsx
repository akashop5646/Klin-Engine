import React from "react";

export const HistoryPanel: React.FC = () => {
  return (
    <div style={{ padding: "0.5rem", fontSize: "0.85rem" }}>
      <h5 style={{ margin: "0 0 0.5rem 0" }}>Historical Versions</h5>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <li style={{ padding: "0.4rem", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "4px" }}>
          <strong>V3: Published</strong><br/>
          <span style={{ fontSize: "0.75rem", color: "#718096" }}>Today at 12:00</span>
        </li>
        <li style={{ padding: "0.4rem", border: "1px solid #eaeaea", borderRadius: "4px" }}>
          <strong>V2: Saved Autosave</strong><br/>
          <span style={{ fontSize: "0.75rem", color: "#718096" }}>Today at 11:30</span>
        </li>
        <li style={{ padding: "0.4rem", border: "1px solid #eaeaea", borderRadius: "4px" }}>
          <strong>V1: Initial Scaffold</strong><br/>
          <span style={{ fontSize: "0.75rem", color: "#718096" }}>Today at 10:00</span>
        </li>
      </ul>
    </div>
  );
};
export default HistoryPanel;
