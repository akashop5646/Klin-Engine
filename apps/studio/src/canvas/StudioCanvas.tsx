import React from "react";

export const StudioCanvas: React.FC = () => {
  return (
    <div style={{
      flex: 1,
      backgroundColor: "#f0f2f5",
      padding: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      overflowY: "auto"
    }}>
      {/* Outer Browser Viewport Simulation */}
      <div style={{
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "#fff",
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        minHeight: "500px",
        border: "1px solid #e2e8f0",
        padding: "2rem",
        boxSizing: "border-box"
      }}>
        {/* Mock Rendered Template Page */}
        <div style={{ textAlign: "center", padding: "4rem 0", backgroundColor: "#f7fafc", borderRadius: "8px", border: "2px dashed #cbd5e0" }}>
          <h1 style={{ margin: "0 0 1rem 0", color: "#2d3748" }}>Welcome to your new website!</h1>
          <p style={{ color: "#718096", maxWidth: "400px", margin: "0 auto 1.5rem auto" }}>
            This page was cloned from the template. You can see your Section, Container, Heading, and Button layout blocks here.
          </p>
          <button style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold" }}>
            Get Started Button
          </button>
        </div>
      </div>
    </div>
  );
};
export default StudioCanvas;
