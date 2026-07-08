import React from "react";

export const FieldsPanel: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5>Schema Fields</h5>
      <ul style={{ paddingLeft: "1.2rem" }}>
        <li>Title (String)</li>
        <li>Published Date (Date)</li>
        <li>Author (Relation)</li>
      </ul>
    </div>
  );
};
export default FieldsPanel;
