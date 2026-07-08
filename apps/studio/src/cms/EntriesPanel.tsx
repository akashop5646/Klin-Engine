import React from "react";

export const EntriesPanel: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5>Collections Entries</h5>
      <ul style={{ paddingLeft: "1.2rem" }}>
        <li>Post 1: "Klin Framework Launch"</li>
        <li>Post 2: "Understanding visual layout components"</li>
      </ul>
    </div>
  );
};
export default EntriesPanel;
