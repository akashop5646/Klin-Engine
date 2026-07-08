import React, { useState } from "react";

export const LeftSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Pages" | "Blocks" | "Layers" | "CMS" | "Commerce" | "Assets">("Pages");

  const tabs: Array<typeof activeTab> = ["Pages", "Blocks", "Layers", "CMS", "Commerce", "Assets"];

  return (
    <div style={{ width: "240px", borderRight: "1px solid #eaeaea", display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#fff" }}>
      {/* Sidebar Tabs Headings */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderBottom: "1px solid #eaeaea", backgroundColor: "#f9fafb" }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: "0.5rem 0.25rem",
              border: "none",
              backgroundColor: activeTab === t ? "#fff" : "transparent",
              borderBottom: activeTab === t ? "2px solid #0070f3" : "none",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: activeTab === t ? "bold" : "normal"
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Sidebar Panels contents */}
      <div style={{ padding: "1rem", flex: 1, overflowY: "auto" }}>
        {activeTab === "Pages" && (
          <div>
            <h5 style={{ margin: "0 0 0.5rem 0" }}>Pages Manager</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <li style={{ padding: "0.25rem", backgroundColor: "#f0f7ff", borderRadius: "4px" }}>🏠 /home</li>
              <li style={{ padding: "0.25rem" }}>ℹ /about</li>
              <li style={{ padding: "0.25rem" }}>✉ /contact</li>
            </ul>
          </div>
        )}

        {activeTab === "Blocks" && (
          <div>
            <h5 style={{ margin: "0 0 0.5rem 0" }}>Standard Blocks</h5>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {["Section", "Container", "Heading", "Text", "Button", "Image", "Spacer"].map(b => (
                <div key={b} style={{ border: "1px solid #e2e8f0", padding: "0.5rem", borderRadius: "4px", fontSize: "0.8rem", textAlign: "center", backgroundColor: "#fff" }}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Layers" && (
          <div>
            <h5 style={{ margin: "0 0 0.5rem 0" }}>Navigator Layers</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.8rem" }}>
              <li>Body</li>
              <li style={{ paddingLeft: "1rem" }}>└─ Section</li>
              <li style={{ paddingLeft: "2rem" }}>└─ Container</li>
              <li style={{ paddingLeft: "3rem" }}>└─ Heading (Title)</li>
              <li style={{ paddingLeft: "3rem" }}>└─ Button (CTA)</li>
            </ul>
          </div>
        )}

        {["CMS", "Commerce", "Assets"].includes(activeTab) && (
          <div style={{ textAlign: "center", color: "#a0aec0", padding: "2rem 0" }}>
            <p style={{ margin: 0, fontSize: "1.2rem" }}>🚧</p>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.8rem" }}>Coming Soon in Later Milestones</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default LeftSidebar;
