import React from "react";
import { TopToolbar } from "./TopToolbar";
import { LeftSidebar } from "./LeftSidebar";
import { StudioCanvas } from "../canvas/StudioCanvas";
import { RightSidebar } from "./RightSidebar";
import { BottomStatusBar } from "./BottomStatusBar";

interface StudioLayoutProps {
  siteId: string;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ siteId }) => {
  const handleSave = () => console.log("Save triggered");
  const handlePublish = () => console.log("Publish triggered");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <TopToolbar siteId={siteId} onSave={handleSave} onPublish={handlePublish} />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LeftSidebar />
        <StudioCanvas />
        <RightSidebar />
      </div>
      <BottomStatusBar />
    </div>
  );
};
export default StudioLayout;
