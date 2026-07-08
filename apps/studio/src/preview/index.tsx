import { useEffect, useState, useCallback } from "react";
import type { DesignState } from "@/lib/design-engine/types";
import { StorefrontRenderer } from "@/lib/design-engine/renderer";
import { getTemplates, templateToDesignState } from "@/lib/design-engine/templates";

/**
 * StorefrontPreviewPage
 *
 * Lightweight page loaded inside the builder's iframe.
 * Receives design state via postMessage from the parent builder,
 * and renders the StorefrontRenderer with the current page.
 */
export default function StorefrontPreviewPage() {
  const [design, setDesign] = useState<DesignState | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  // Fetch user's products for live preview
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error("Fetch products preview error:", err);
      }
    };
    fetchProducts();
  }, []);

  // Listen for UPDATE_DESIGN messages from parent, or load template directly from query param
  useEffect(() => {
    // ponytail: notify parent that the iframe is ready to receive state
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*");

    const params = new URLSearchParams(window.location.search);
    const presetId = params.get("preset");
    if (presetId) {
      const tpl = getTemplates().find((t) => t.id === presetId);
      if (tpl) {
        const ds = templateToDesignState(tpl);
        setDesign(ds);
        setCurrentPageId(ds.pages[0]?.id || "");
      }
      return;
    }

    const handler = (e: MessageEvent) => {
      if (e.data?.type === "UPDATE_DESIGN") {
        setDesign(e.data.design);
        setCurrentPageId(e.data.currentPageId);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // Notify parent when a section is clicked
  const handleSectionClick = useCallback((sectionId: string) => {
    window.parent.postMessage({ type: "SECTION_CLICKED", sectionId }, "*");
  }, []);

  // Loading state
  if (!design) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "'Inter', sans-serif",
          color: "#A1A1AA",
          fontSize: "0.875rem",
          background: "#FAFAFA",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: "2px solid #E4E4E7",
              borderTopColor: "#3B82F6",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p>Loading preview...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <StorefrontRenderer
      design={design}
      currentPageId={currentPageId}
      onSectionClick={handleSectionClick}
      products={products}
    />
  );
}
