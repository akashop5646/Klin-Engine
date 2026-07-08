import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/inter/index.css";
import "../../cloud/src/index.css";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Save,
  Rocket,
  FileText,
  Layers,
  Palette,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Search,
  X,
  Check,
  Loader2,
  PanelTop,
  Image,
  ShoppingBag,
  Type,
  ImagePlus,
  LayoutGrid,
  Sparkles,
  MessageSquareQuote,
  Mail,
  HelpCircle,
  Megaphone,
  PanelBottom,
} from "lucide-react";

import { useDesignEngine } from "@/lib/design-engine/engine";
import { getAllSections, getSectionDefinition } from "@/lib/design-engine/sections";
import { getTemplates, templateToDesignState } from "@/lib/design-engine/templates";
import type { SectionType, InspectorField, DeviceMode } from "@/lib/design-engine/types";
import { PlatformSDK } from "@klin/platform";
import StorefrontPreviewPage from "./preview";

// ─── Icon resolver ─────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  PanelTop, Image, ShoppingBag, Type, ImagePlus, LayoutGrid,
  Sparkles, MessageSquareQuote, Mail, HelpCircle, Megaphone, PanelBottom,
};

function SectionIcon({ name, size = 18 }: { name: string; size?: number }) {
  const Comp = ICON_MAP[name] || Layers;
  return <Comp size={size} />;
}

// ─── Main Component ────────────────────────────────────────

export default function DesignStudioPage() {
  const { websiteId } = useParams();
  const engine = useDesignEngine();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const initRef = useRef(false);

  // Sync route param to query param before load
  if (websiteId) {
    const params = new URLSearchParams(window.location.search);
    if (params.get("websiteId") !== websiteId) {
      params.set("websiteId", websiteId);
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    }
  }

  // Load design on mount
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    document.title = "Design Studio · Kiln";
    engine.load();
  }, []);


  // Sync design to preview iframe
  useEffect(() => {
    if (!iframeRef.current?.contentWindow || !engine.isLoaded) return;
    iframeRef.current.contentWindow.postMessage(
      { type: "UPDATE_DESIGN", design: engine.design, currentPageId: engine.editor.currentPageId },
      "*"
    );
  }, [engine.design, engine.editor.currentPageId, engine.isLoaded]);

  // Listen for section clicks or readiness from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "SECTION_CLICKED") {
        engine.selectSection(e.data.sectionId);
        engine.setSidebarTab("sections");
      } else if (e.data?.type === "PREVIEW_READY") {
        // Send initial design state upon preview ready signal
        if (iframeRef.current?.contentWindow && engine.isLoaded) {
          iframeRef.current.contentWindow.postMessage(
            { type: "UPDATE_DESIGN", design: engine.design, currentPageId: engine.editor.currentPageId },
            "*"
          );
        }
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [engine.isLoaded, engine.design, engine.editor.currentPageId]);

  // Device widths
  const deviceWidths: Record<DeviceMode, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  if (!engine.isLoaded) {
    return (
      <div style={S.loadingScreen}>
        <Loader2 size={32} style={{ animation: "spin 1s linear infinite", opacity: 0.4 }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={S.root}>
      {/* ── Template Picker Modal ──────────────────────── */}
      {engine.editor.showTemplatePickerModal && (
        <TemplatePickerModal
          onSelect={(templateId) => {
            const tpl = getTemplates().find((t) => t.id === templateId);
            if (tpl) {
              const ds = templateToDesignState(tpl);
              engine.createFromTemplate(ds);
            }
          }}
        />
      )}

      {/* ── Add Section Modal ─────────────────────────── */}
      {engine.editor.showAddSectionModal && (
        <AddSectionModal
          onClose={() => engine.setShowAddSectionModal(false)}
          onAdd={(type, defaultConfig) => engine.addSection(type, defaultConfig)}
        />
      )}

      {/* ── Top Toolbar ───────────────────────────────── */}
      <header style={S.toolbar}>
        <div style={S.toolbarLeft}>
          <button style={S.toolbarBtn} onClick={() => navigate("/dashboard/online-store")} title="Back to Dashboard">
            <ArrowLeft size={18} />
          </button>
          <div style={S.dividerV} />
          <span style={S.logoText}>Klin</span>
          <span style={S.storeName}>{engine.design.pages[0]?.sections[0]?.config?.logoText || "Your Store"}</span>
        </div>

        <div style={S.toolbarCenter}>
          <button
            style={{ ...S.toolbarBtn, opacity: engine.canUndo ? 1 : 0.3 }}
            onClick={engine.undo}
            disabled={!engine.canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={16} />
          </button>
          <button
            style={{ ...S.toolbarBtn, opacity: engine.canRedo ? 1 : 0.3 }}
            onClick={engine.redo}
            disabled={!engine.canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={16} />
          </button>
          <div style={S.dividerV} />
          {(["desktop", "tablet", "mobile"] as DeviceMode[]).map((d) => (
            <button
              key={d}
              style={{
                ...S.toolbarBtn,
                background: engine.editor.device === d ? "#27272A" : "transparent",
                color: engine.editor.device === d ? "#fff" : "#71717A",
              }}
              onClick={() => engine.setDevice(d)}
              title={d.charAt(0).toUpperCase() + d.slice(1)}
            >
              {d === "desktop" ? <Monitor size={16} /> : d === "tablet" ? <Tablet size={16} /> : <Smartphone size={16} />}
            </button>
          ))}
        </div>

        <div style={S.toolbarRight}>
          <SaveStatus isDirty={engine.editor.isDirty} isSaving={engine.editor.isSaving} lastSaved={engine.editor.lastSaved} />
          <button style={S.saveBtn} onClick={engine.save} title="Save (Ctrl+S)">
            <Save size={14} />
            Save
          </button>
          <PublishButton onPublish={engine.publish} publishedAt={engine.design.publishedAt} />
        </div>
      </header>

      {/* ── Main Content ──────────────────────────────── */}
      <div style={S.main}>
        {/* Left Sidebar */}
        <aside style={S.sidebar}>
          {/* Sidebar tabs */}
          <div style={S.sidebarTabs}>
            {([
              { key: "pages", icon: FileText, label: "Pages" },
              { key: "sections", icon: Layers, label: "Sections" },
              { key: "theme", icon: Palette, label: "Theme" },
            ] as const).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                style={{
                  ...S.sidebarTab,
                  background: engine.editor.sidebarTab === key ? "#27272A" : "transparent",
                  color: engine.editor.sidebarTab === key ? "#FAFAFA" : "#71717A",
                }}
                onClick={() => engine.setSidebarTab(key)}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          {/* Sidebar content */}
          <div style={S.sidebarContent}>
            {engine.editor.sidebarTab === "pages" && (
              <PagesPanel engine={engine} />
            )}
            {engine.editor.sidebarTab === "sections" && (
              <SectionsPanel engine={engine} />
            )}
            {engine.editor.sidebarTab === "theme" && (
              <ThemePanel engine={engine} />
            )}
          </div>
        </aside>

        {/* Preview Canvas */}
        <main style={S.canvas}>
          <div style={{
            ...S.previewWrapper,
            width: deviceWidths[engine.editor.device],
            maxWidth: "100%",
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            {/* Browser chrome */}
            <div style={S.browserChrome}>
              <div style={S.windowDots}>
                <span style={{ ...S.dot, background: "#FF5F57" }} />
                <span style={{ ...S.dot, background: "#FEBC2E" }} />
                <span style={{ ...S.dot, background: "#28C840" }} />
              </div>
              <div style={S.addressBar}>
                <span style={S.addressText}>https://store.kiln.store</span>
              </div>
            </div>
            <iframe
              ref={iframeRef}
              src="/storefront-preview"
              style={S.iframe}
              title="Storefront Preview"
            />
          </div>
        </main>

        {/* Right Inspector */}
        {engine.selectedSection && (
          <InspectorPanel engine={engine} />
        )}
      </div>

      {/* Status Bar */}
      <div style={S.statusBar}>
        <span style={S.statusText}>
          {engine.editor.isDirty ? "● Unsaved changes" : engine.editor.lastSaved ? `Saved ${timeAgo(engine.editor.lastSaved)}` : "Ready"}
        </span>
        <span style={S.statusText}>
          {engine.design.publishedAt ? "Published" : "Draft"} · v{engine.design.version}
        </span>
      </div>
    </div>
  );
}

// ─── Sub-Components ────────────────────────────────────────

function PagesPanel({ engine }: { engine: ReturnType<typeof useDesignEngine> }) {
  return (
    <div>
      <h3 style={S.panelTitle}>Pages</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {engine.design.pages.map((page) => (
          <button
            key={page.id}
            style={{
              ...S.listItem,
              background: engine.editor.currentPageId === page.id ? "#27272A" : "transparent",
              color: engine.editor.currentPageId === page.id ? "#FAFAFA" : "#A1A1AA",
            }}
            onClick={() => engine.setCurrentPage(page.id)}
          >
            <FileText size={14} style={{ opacity: 0.5, flexShrink: 0 }} />
            <span style={{ flex: 1, textAlign: "left" }}>{page.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionsPanel({ engine }: { engine: ReturnType<typeof useDesignEngine> }) {
  const page = engine.currentPage;
  if (!page) return <p style={S.emptyText}>Select a page first.</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h3 style={S.panelTitle}>Sections</h3>
        <button
          style={S.addBtn}
          onClick={() => engine.setShowAddSectionModal(true)}
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {page.sections.map((section, idx) => {
          const def = getSectionDefinition(section.type);
          const isSelected = engine.editor.selectedSectionId === section.id;

          return (
            <div
              key={section.id}
              style={{
                ...S.sectionItem,
                background: isSelected ? "#27272A" : "transparent",
                borderColor: isSelected ? "#3B82F6" : "transparent",
              }}
              onClick={() => engine.selectSection(section.id)}
            >
              <GripVertical size={12} style={{ opacity: 0.25, flexShrink: 0, cursor: "grab" }} />
              <SectionIcon name={def?.icon || "Layers"} size={14} />
              <span style={{
                flex: 1, fontSize: "0.8125rem", fontWeight: 500,
                color: isSelected ? "#FAFAFA" : "#A1A1AA",
                opacity: section.isVisible ? 1 : 0.4,
              }}>
                {def?.label || section.type}
              </span>

              {isSelected && (
                <div style={{ display: "flex", gap: "4px" }}>
                  <button style={S.iconBtn} onClick={(e) => { e.stopPropagation(); engine.moveSection(section.id, "up"); }} title="Move Up">
                    <ChevronUp size={12} />
                  </button>
                  <button style={S.iconBtn} onClick={(e) => { e.stopPropagation(); engine.moveSection(section.id, "down"); }} title="Move Down">
                    <ChevronDown size={12} />
                  </button>
                  <button style={S.iconBtn} onClick={(e) => { e.stopPropagation(); engine.duplicateSection(section.id); }} title="Duplicate">
                    <Copy size={12} />
                  </button>
                  <button style={S.iconBtn} onClick={(e) => { e.stopPropagation(); engine.toggleSectionVisibility(section.id); }} title="Toggle Visibility">
                    {section.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <button style={{ ...S.iconBtn, color: "#EF4444" }} onClick={(e) => { e.stopPropagation(); engine.removeSection(section.id); }} title="Delete">
                    <Trash2 size={12} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {page.sections.length === 0 && (
        <div style={S.emptyState}>
          <Layers size={24} style={{ opacity: 0.2, marginBottom: "8px" }} />
          <p style={{ fontSize: "0.8125rem", opacity: 0.4 }}>No sections yet</p>
          <button style={{ ...S.addBtn, marginTop: "12px" }} onClick={() => engine.setShowAddSectionModal(true)}>
            <Plus size={14} /> Add Section
          </button>
        </div>
      )}
    </div>
  );
}

function ThemePanel({ engine }: { engine: ReturnType<typeof useDesignEngine> }) {
  const theme = engine.design.theme;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Colors */}
      <div>
        <h3 style={S.panelTitle}>Colors</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {(["primary", "secondary", "accent", "background", "surface", "text"] as const).map((key) => (
            <label key={key} style={S.colorRow}>
              <input
                type="color"
                value={theme.colors[key]}
                onChange={(e) => engine.updateThemeColor(key, e.target.value)}
                style={S.colorInput}
              />
              <span style={S.colorLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span style={S.colorHex}>{theme.colors[key]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 style={S.panelTitle}>Typography</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={S.fieldRow}>
            <span style={S.fieldLabel}>Heading Font</span>
            <select
              value={theme.typography.headingFont}
              onChange={(e) => engine.updateThemeTypography("headingFont", e.target.value)}
              style={S.select}
            >
              {["Inter", "Playfair Display", "Georgia", "DM Serif Display", "Merriweather", "Lora"].map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
          <label style={S.fieldRow}>
            <span style={S.fieldLabel}>Body Font</span>
            <select
              value={theme.typography.bodyFont}
              onChange={(e) => engine.updateThemeTypography("bodyFont", e.target.value)}
              style={S.select}
            >
              {["Inter", "system-ui", "Georgia", "DM Sans", "Nunito", "Lato"].map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <h3 style={S.panelTitle}>Buttons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={S.fieldRow}>
            <span style={S.fieldLabel}>Style</span>
            <div style={{ display: "flex", gap: "6px" }}>
              {(["rounded", "square", "pill"] as const).map((s) => (
                <button
                  key={s}
                  style={{
                    ...S.chipBtn,
                    background: theme.buttons.style === s ? "#3B82F6" : "#27272A",
                    color: theme.buttons.style === s ? "#fff" : "#A1A1AA",
                  }}
                  onClick={() => engine.updateThemeButtons({ style: s })}
                >
                  {s}
                </button>
              ))}
            </div>
          </label>
          <label style={S.fieldRow}>
            <span style={S.fieldLabel}>Shadow</span>
            <ToggleSwitch checked={theme.buttons.shadow} onChange={(v) => engine.updateThemeButtons({ shadow: v })} />
          </label>
        </div>
      </div>

      {/* Animations */}
      <div>
        <h3 style={S.panelTitle}>Animations</h3>
        <select
          value={theme.animations}
          onChange={(e) => engine.updateTheme({ animations: e.target.value as any })}
          style={S.select}
        >
          {["none", "fade", "slide", "scale", "luxury", "modern"].map((a) => (
            <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function InspectorPanel({ engine }: { engine: ReturnType<typeof useDesignEngine> }) {
  const section = engine.selectedSection;
  if (!section) return null;
  const def = getSectionDefinition(section.type);
  if (!def) return null;

  const fields = def.inspectorFields;
  const contentFields = fields.filter((f) => f.tab === "content");
  const styleFields = fields.filter((f) => f.tab === "style");
  const layoutFields = fields.filter((f) => f.tab === "layout");

  return (
    <aside style={S.inspector}>
      <div style={S.inspectorHeader}>
        <SectionIcon name={def.icon} size={16} />
        <h3 style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#FAFAFA" }}>{def.label}</h3>
        <button
          style={{ ...S.iconBtn, marginLeft: "auto" }}
          onClick={() => engine.selectSection(null)}
          title="Close Inspector"
        >
          <X size={14} />
        </button>
      </div>

      {/* Inspector tabs */}
      <div style={S.inspectorTabs}>
        {(["content", "style", "layout"] as const).map((tab) => {
          const count = tab === "content" ? contentFields.length : tab === "style" ? styleFields.length : layoutFields.length;
          if (count === 0) return null;
          return (
            <button
              key={tab}
              style={{
                ...S.inspectorTab,
                borderBottomColor: engine.editor.inspectorTab === tab ? "#3B82F6" : "transparent",
                color: engine.editor.inspectorTab === tab ? "#FAFAFA" : "#71717A",
              }}
              onClick={() => engine.setInspectorTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Fields */}
      <div style={S.inspectorFields}>
        {(engine.editor.inspectorTab === "content" ? contentFields :
          engine.editor.inspectorTab === "style" ? styleFields : layoutFields
        ).map((field) => (
          <InspectorFieldRenderer
            key={field.key}
            field={field}
            value={section.config[field.key]}
            onChange={(val) => engine.updateSectionConfig(section.id, field.key, val)}
          />
        ))}
      </div>
    </aside>
  );
}

function InspectorFieldRenderer({
  field,
  value,
  onChange,
}: {
  field: InspectorField;
  value: any;
  onChange: (val: any) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <label style={S.fieldRow}>
          <span style={S.fieldLabel}>{field.label}</span>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            style={S.input}
          />
        </label>
      );
    case "textarea":
      return (
        <label style={S.fieldRow}>
          <span style={S.fieldLabel}>{field.label}</span>
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            style={{ ...S.input, resize: "vertical" as const, minHeight: "72px" }}
          />
        </label>
      );
    case "number":
      return (
        <label style={S.fieldRow}>
          <span style={S.fieldLabel}>{field.label}</span>
          <input
            type="number"
            value={value ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{ ...S.input, width: "80px" }}
          />
        </label>
      );
    case "select":
      return (
        <label style={S.fieldRow}>
          <span style={S.fieldLabel}>{field.label}</span>
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={S.select}
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      );
    case "toggle":
      return (
        <label style={S.fieldRow}>
          <span style={S.fieldLabel}>{field.label}</span>
          <ToggleSwitch checked={!!value} onChange={onChange} />
        </label>
      );
    case "color":
      return (
        <label style={S.fieldRow}>
          <span style={S.fieldLabel}>{field.label}</span>
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            style={S.colorInput}
          />
        </label>
      );
    case "image":
      return (
        <label style={S.fieldRow}>
          <span style={S.fieldLabel}>{field.label}</span>
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL..."
            style={S.input}
          />
        </label>
      );
    default:
      return null;
  }
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 36, height: 20, borderRadius: 10, border: "none", cursor: "pointer",
        background: checked ? "#3B82F6" : "#3F3F46",
        position: "relative" as const, transition: "background 0.15s ease",
      }}
    >
      <span style={{
        position: "absolute" as const, top: 2, left: checked ? 18 : 2,
        width: 16, height: 16, borderRadius: "50%", background: "#fff",
        transition: "left 0.15s ease",
      }} />
    </button>
  );
}

function SaveStatus({ isDirty, isSaving, lastSaved }: { isDirty: boolean; isSaving: boolean; lastSaved: Date | null }) {
  if (isSaving) return <span style={S.saveStatus}><Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> Saving...</span>;
  if (isDirty) return <span style={{ ...S.saveStatus, color: "#FBBF24" }}>● Unsaved</span>;
  if (lastSaved) return <span style={{ ...S.saveStatus, color: "#22C55E" }}><Check size={12} /> Saved</span>;
  return null;
}

function PublishButton({ onPublish, publishedAt }: { onPublish: () => Promise<boolean | undefined>; publishedAt: string | null }) {
  const [publishing, setPublishing] = useState(false);

  const handlePublish = async () => {
    setPublishing(true);
    await onPublish();
    setPublishing(false);
  };

  return (
    <button style={S.publishBtn} onClick={handlePublish} disabled={publishing}>
      {publishing ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Rocket size={14} />}
      {publishedAt ? "Update" : "Publish"}
    </button>
  );
}

function AddSectionModal({ onClose, onAdd }: { onClose: () => void; onAdd: (type: SectionType, config: Record<string, any>) => void }) {
  const [search, setSearch] = useState("");
  const allSections = getAllSections();
  const filtered = search
    ? allSections.filter((s) => s.label.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
    : allSections;

  const categories = ["navigation", "hero", "commerce", "content", "social", "marketing"];

  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={(e) => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#FAFAFA" }}>Add Section</h2>
          <button style={S.iconBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ padding: "0 24px 12px" }}>
          <div style={S.searchBox}>
            <Search size={14} style={{ opacity: 0.4, flexShrink: 0 }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sections..."
              autoFocus
              style={S.searchInput}
            />
          </div>
        </div>

        <div style={S.modalBody}>
          {categories.map((cat) => {
            const items = filtered.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: "24px" }}>
                <h4 style={S.categoryLabel}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {items.map((sec) => (
                    <button
                      key={sec.type}
                      style={S.sectionCard}
                      onClick={() => onAdd(sec.type, { ...sec.defaultConfig })}
                    >
                      <SectionIcon name={sec.icon} size={20} />
                      <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{sec.label}</span>
                      <span style={{ fontSize: "0.6875rem", opacity: 0.5, lineHeight: 1.4 }}>{sec.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TemplatePickerModal({ onSelect }: { onSelect: (id: string) => void }) {
  const templates = getTemplates();
  return (
    <div style={S.modalOverlay}>
      <div style={{ ...S.modal, maxWidth: "720px" }}>
        <div style={S.modalHeader}>
          <div>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#FAFAFA" }}>Choose a Template</h2>
            <p style={{ fontSize: "0.8125rem", color: "#71717A", marginTop: "4px" }}>Pick a starting point. You can customize everything later.</p>
          </div>
        </div>
        <div style={{ ...S.modalBody, padding: "0 24px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                style={S.templateCard}
                onClick={() => onSelect(tpl.id)}
              >
                <div style={{
                  height: "120px", borderRadius: "8px", marginBottom: "12px",
                  background: `linear-gradient(135deg, ${tpl.theme.colors.background}, ${tpl.theme.colors.surface})`,
                  border: `1px solid ${tpl.theme.colors.text}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "1.5rem", fontFamily: tpl.theme.typography.headingFont, fontWeight: 700, color: tpl.theme.colors.text, opacity: 0.7 }}>
                    Aa
                  </span>
                </div>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#FAFAFA", marginBottom: "4px" }}>{tpl.name}</h3>
                <p style={{ fontSize: "0.75rem", color: "#71717A", lineHeight: 1.4 }}>{tpl.description}</p>
                <span style={{ fontSize: "0.6875rem", color: "#3B82F6", marginTop: "8px", display: "inline-block" }}>{tpl.category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Utility ───────────────────────────────────────────────

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

// ─── Inline Styles ─────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  root: {
    height: "100vh", display: "flex", flexDirection: "column",
    background: "#09090B", color: "#FAFAFA", fontFamily: "'Inter', sans-serif",
    fontSize: "13px", overflow: "hidden",
  },
  loadingScreen: {
    height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#09090B", color: "#FAFAFA",
  },

  // ── Toolbar ──
  toolbar: {
    height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 16px", borderBottom: "1px solid #27272A", background: "#0C0C0F",
    flexShrink: 0, zIndex: 50,
  },
  toolbarLeft: { display: "flex", alignItems: "center", gap: "10px" },
  toolbarCenter: { display: "flex", alignItems: "center", gap: "4px" },
  toolbarRight: { display: "flex", alignItems: "center", gap: "10px" },
  toolbarBtn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: 32, height: 32, border: "none", borderRadius: 6, cursor: "pointer",
    background: "transparent", color: "#A1A1AA", transition: "all 0.15s ease",
  },
  logoText: {
    fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em",
    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  storeName: { fontSize: "0.8125rem", color: "#71717A", fontWeight: 500 },
  dividerV: { width: 1, height: 20, background: "#27272A" },
  saveBtn: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "6px 14px", border: "1px solid #27272A", borderRadius: 6, cursor: "pointer",
    background: "transparent", color: "#A1A1AA", fontSize: "0.8125rem", fontWeight: 500,
    transition: "all 0.15s ease",
  },
  publishBtn: {
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "6px 16px", border: "none", borderRadius: 6, cursor: "pointer",
    background: "#3B82F6", color: "#fff", fontSize: "0.8125rem", fontWeight: 600,
    transition: "all 0.15s ease",
  },
  saveStatus: {
    display: "inline-flex", alignItems: "center", gap: "4px",
    fontSize: "0.75rem", color: "#71717A", fontWeight: 500,
  },

  // ── Main layout ──
  main: { flex: 1, display: "flex", overflow: "hidden" },

  // ── Sidebar ──
  sidebar: {
    width: 256, borderRight: "1px solid #1A1A1E", background: "#0F0F12",
    display: "flex", flexDirection: "column", flexShrink: 0,
  },
  sidebarTabs: {
    display: "flex", padding: "8px 8px 0", gap: "2px",
    borderBottom: "1px solid #1A1A1E",
  },
  sidebarTab: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
    padding: "8px 0", border: "none", borderRadius: "6px 6px 0 0", cursor: "pointer",
    fontSize: "0.75rem", fontWeight: 500, background: "transparent",
    transition: "all 0.15s ease",
  },
  sidebarContent: { flex: 1, overflow: "auto", padding: "12px" },

  // ── Canvas ──
  canvas: {
    flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center",
    background: "#18181B", overflow: "auto", padding: "24px",
  },
  previewWrapper: {
    borderRadius: "12px", overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
    display: "flex", flexDirection: "column",
    height: "calc(100vh - 56px - 32px - 48px)",
  },
  browserChrome: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "10px 14px", background: "#27272A", flexShrink: 0,
  },
  windowDots: { display: "flex", gap: "6px" },
  dot: { width: 10, height: 10, borderRadius: "50%", display: "block" },
  addressBar: {
    flex: 1, padding: "5px 12px", borderRadius: 6, background: "#3F3F46",
    display: "flex", alignItems: "center",
  },
  addressText: { fontSize: "0.6875rem", color: "#A1A1AA", fontWeight: 500, userSelect: "none" as const },
  iframe: { flex: 1, border: "none", width: "100%", background: "#fff" },

  // ── Inspector ──
  inspector: {
    width: 320, borderLeft: "1px solid #1A1A1E", background: "#0F0F12",
    display: "flex", flexDirection: "column", flexShrink: 0, overflow: "auto",
  },
  inspectorHeader: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "14px 16px", borderBottom: "1px solid #1A1A1E",
  },
  inspectorTabs: {
    display: "flex", borderBottom: "1px solid #1A1A1E",
  },
  inspectorTab: {
    flex: 1, padding: "10px 0", border: "none", borderBottom: "2px solid transparent",
    cursor: "pointer", fontSize: "0.75rem", fontWeight: 500,
    background: "transparent", textAlign: "center" as const,
    transition: "all 0.15s ease",
  },
  inspectorFields: { padding: "16px", display: "flex", flexDirection: "column", gap: "12px" },

  // ── Status Bar ──
  statusBar: {
    height: 32, display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 16px", borderTop: "1px solid #1A1A1E", background: "#0C0C0F",
    flexShrink: 0,
  },
  statusText: { fontSize: "0.6875rem", color: "#52525B", fontWeight: 500 },

  // ── Shared ──
  panelTitle: {
    fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" as const,
    letterSpacing: "0.06em", color: "#52525B", marginBottom: "10px",
  },
  listItem: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer",
    fontSize: "0.8125rem", fontWeight: 500, width: "100%",
    background: "transparent", textAlign: "left" as const,
    transition: "all 0.1s ease",
  },
  sectionItem: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "7px 8px", borderRadius: 6, cursor: "pointer",
    border: "1px solid transparent", transition: "all 0.1s ease",
    color: "#A1A1AA",
  },
  addBtn: {
    display: "inline-flex", alignItems: "center", gap: "4px",
    padding: "5px 10px", border: "1px solid #27272A", borderRadius: 6,
    cursor: "pointer", background: "transparent", color: "#71717A",
    fontSize: "0.75rem", fontWeight: 500, transition: "all 0.15s ease",
  },
  iconBtn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: 22, height: 22, border: "none", borderRadius: 4, cursor: "pointer",
    background: "transparent", color: "#71717A", transition: "all 0.1s ease",
  },
  emptyState: {
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "40px 20px", textAlign: "center" as const,
  },
  emptyText: { fontSize: "0.8125rem", color: "#52525B", textAlign: "center" as const, padding: "40px 20px" },

  // ── Form fields ──
  fieldRow: {
    display: "flex", flexDirection: "column", gap: "4px",
  },
  fieldLabel: {
    fontSize: "0.75rem", fontWeight: 500, color: "#71717A",
  },
  input: {
    width: "100%", padding: "8px 10px", border: "1px solid #27272A", borderRadius: 6,
    background: "#18181B", color: "#FAFAFA", fontSize: "0.8125rem", outline: "none",
    transition: "border-color 0.15s ease",
  },
  select: {
    width: "100%", padding: "8px 10px", border: "1px solid #27272A", borderRadius: 6,
    background: "#18181B", color: "#FAFAFA", fontSize: "0.8125rem", outline: "none",
    cursor: "pointer",
  },
  colorRow: {
    display: "flex", alignItems: "center", gap: "10px",
  },
  colorInput: {
    width: 28, height: 28, border: "1px solid #27272A", borderRadius: 6,
    cursor: "pointer", background: "transparent", padding: 0,
  },
  colorLabel: { flex: 1, fontSize: "0.8125rem", color: "#A1A1AA", fontWeight: 500 },
  colorHex: { fontSize: "0.6875rem", color: "#52525B", fontFamily: "monospace" },
  chipBtn: {
    padding: "4px 10px", border: "none", borderRadius: 4, cursor: "pointer",
    fontSize: "0.75rem", fontWeight: 500, transition: "all 0.1s ease",
  },

  // ── Modals ──
  modalOverlay: {
    position: "fixed" as const, inset: 0, zIndex: 100,
    background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    width: "100%", maxWidth: "560px", maxHeight: "80vh",
    background: "#18181B", borderRadius: 12, border: "1px solid #27272A",
    display: "flex", flexDirection: "column", overflow: "hidden",
  },
  modalHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "20px 24px 16px",
  },
  modalBody: {
    flex: 1, overflow: "auto", padding: "0 24px 24px",
  },
  searchBox: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "8px 12px", border: "1px solid #27272A", borderRadius: 8,
    background: "#0F0F12",
  },
  searchInput: {
    flex: 1, border: "none", background: "transparent", color: "#FAFAFA",
    fontSize: "0.8125rem", outline: "none",
  },
  sectionCard: {
    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px",
    padding: "14px", border: "1px solid #27272A", borderRadius: 8,
    background: "transparent", color: "#A1A1AA", cursor: "pointer",
    textAlign: "left" as const, transition: "all 0.15s ease",
  },
  templateCard: {
    padding: "12px", border: "1px solid #27272A", borderRadius: 10,
    background: "transparent", color: "#A1A1AA", cursor: "pointer",
    textAlign: "left" as const, transition: "all 0.15s ease",
  },
  categoryLabel: {
    fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" as const,
    letterSpacing: "0.06em", color: "#52525B", marginBottom: "8px",
  },
};

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/builder/:websiteId" element={<DesignStudioPage />} />
          <Route path="/storefront-preview" element={<StorefrontPreviewPage />} />
          <Route path="*" element={<DesignStudioPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

