import React from "react";

export const ThemeEditor: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5 style={{ margin: "0 0 0.5rem 0" }}>Theme Presets Settings</h5>
      <div>
        <label>Primary Color</label>
        <input type="color" defaultValue="#0070f3" style={{ display: "block", marginTop: "0.25rem" }} />
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <label>Font Size Base</label>
        <input type="text" defaultValue="16px" style={{ display: "block", marginTop: "0.25rem", width: "100%" }} />
      </div>
    </div>
  );
};
export default ThemeEditor;
