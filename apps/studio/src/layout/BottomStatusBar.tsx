import React from "react";

export const BottomStatusBar: React.FC = () => {
  return (
    <div style={{
      height: "30px",
      borderTop: "1px solid #eaeaea",
      backgroundColor: "#f7fafc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 1rem",
      fontSize: "0.75rem",
      color: "#718096",
      boxSizing: "border-box"
    }}>
      <div>Selected Block: <code>Button (CTA)</code></div>
      <div>Breakpoint: <strong>Desktop (1440px)</strong></div>
      <div>✔ Autosaved 10 seconds ago</div>
    </div>
  );
};
export default BottomStatusBar;
