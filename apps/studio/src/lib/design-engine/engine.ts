import { useState, useCallback, useRef, useEffect } from "react";
import type {
  DesignState,
  EditorState,
  ThemeConfig,
  PageConfig,
  SectionInstance,
  SectionType,
  DeviceMode,
} from "./types";
import { PlatformEngine, WebsiteManager, WebsiteClone, PlatformSDK } from "@klin/platform";
import { getTemplates, templateToDesignState } from "./templates";
import { BuilderIntegration } from "../../state/BuilderIntegration";
import { HistoryBridge } from "../../state/HistoryBridge";
import { generateId } from "./id";

// ─── Default Theme ─────────────────────────────────────────

const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: "#18181B",
    secondary: "#71717A",
    accent: "#D97706",
    background: "#FFFFFF",
    surface: "#FAFAFA",
    text: "#18181B",
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    headingSize: "default",
    bodySize: "default",
  },
  buttons: { style: "rounded", shadow: false },
  cards: { radius: 12, shadow: true, border: false },
  animations: "fade",
};

const DEFAULT_DESIGN: DesignState = {
  templateId: "",
  theme: DEFAULT_THEME,
  pages: [],
  version: 1,
  publishedAt: null,
};

const DEFAULT_EDITOR: EditorState = {
  currentPageId: "",
  selectedSectionId: null,
  device: "desktop",
  isDirty: false,
  isSaving: false,
  lastSaved: null,
  showAddSectionModal: false,
  showTemplatePickerModal: false,
  sidebarTab: "sections",
  inspectorTab: "content",
};


// ─── Hook ──────────────────────────────────────────────────

export function useDesignEngine() {
  const [design, setDesign] = useState<DesignState>(DEFAULT_DESIGN);
  const [editor, setEditor] = useState<EditorState>(DEFAULT_EDITOR);
  const [isLoaded, setIsLoaded] = useState(false);

  // Undo / Redo stacks
  const undoStack = useRef<DesignState[]>([]);
  const redoStack = useRef<DesignState[]>([]);
  const MAX_HISTORY = 50;

  // Auto-save timer
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── History helpers ────────────────────────────────────

  const pushHistory = useCallback(() => {
    undoStack.current = [
      ...undoStack.current.slice(-(MAX_HISTORY - 1)),
      structuredClone(design),
    ];
    redoStack.current = [];
  }, [design]);

  const mutateDesign = useCallback(
    (updater: (prev: DesignState) => DesignState) => {
      pushHistory();
      setDesign((prev) => updater(prev));
      setEditor((prev) => ({ ...prev, isDirty: true }));
    },
    [pushHistory]
  );

  // ── Undo / Redo ───────────────────────────────────────

  const undo = useCallback(() => {
    if (undoStack.current.length === 0) return;
    const prev = undoStack.current.pop()!;
    redoStack.current.push(structuredClone(design));
    setDesign(prev);
    setEditor((e) => ({ ...e, isDirty: true }));
  }, [design]);

  const redo = useCallback(() => {
    if (redoStack.current.length === 0) return;
    const next = redoStack.current.pop()!;
    undoStack.current.push(structuredClone(design));
    setDesign(next);
    setEditor((e) => ({ ...e, isDirty: true }));
  }, [design]);

  const canUndo = undoStack.current.length > 0;
  const canRedo = redoStack.current.length > 0;

  // ── Keyboard shortcuts ────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        ((e.key === "z" && e.shiftKey) || e.key === "y")
      ) {
        e.preventDefault();
        redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  // ── Current page helpers ──────────────────────────────

  const currentPage: PageConfig | undefined = design.pages.find(
    (p) => p.id === editor.currentPageId
  );

  const selectedSection: SectionInstance | undefined = currentPage?.sections.find(
    (s) => s.id === editor.selectedSectionId
  );

  // ── Page operations ───────────────────────────────────

  const setCurrentPage = useCallback((pageId: string) => {
    setEditor((e) => ({
      ...e,
      currentPageId: pageId,
      selectedSectionId: null,
    }));
  }, []);

  const updatePage = useCallback(
    (pageId: string, updates: Partial<PageConfig>) => {
      mutateDesign((d) => ({
        ...d,
        pages: d.pages.map((p) =>
          p.id === pageId ? { ...p, ...updates } : p
        ),
      }));
    },
    [mutateDesign]
  );

  // ── Section operations ────────────────────────────────

  const selectSection = useCallback((sectionId: string | null) => {
    setEditor((e) => ({ ...e, selectedSectionId: sectionId }));
  }, []);

  const addSection = useCallback(
    (
      type: SectionType,
      defaultConfig: Record<string, any>,
      insertIndex?: number
    ) => {
      if (!editor.currentPageId) return;
      const newSection: SectionInstance = {
        id: generateId("sec"),
        type,
        isVisible: true,
        config: { ...defaultConfig },
      };
      mutateDesign((d) => ({
        ...d,
        pages: d.pages.map((p) => {
          if (p.id !== editor.currentPageId) return p;
          const sections = [...p.sections];
          if (insertIndex !== undefined) {
            sections.splice(insertIndex, 0, newSection);
          } else {
            sections.push(newSection);
          }
          return { ...p, sections };
        }),
      }));
      setEditor((e) => ({
        ...e,
        selectedSectionId: newSection.id,
        showAddSectionModal: false,
      }));
    },
    [editor.currentPageId, mutateDesign]
  );

  const updateSectionConfig = useCallback(
    (sectionId: string, key: string, value: any) => {
      if (!editor.currentPageId) return;
      mutateDesign((d) => ({
        ...d,
        pages: d.pages.map((p) => {
          if (p.id !== editor.currentPageId) return p;
          return {
            ...p,
            sections: p.sections.map((s) =>
              s.id === sectionId
                ? { ...s, config: { ...s.config, [key]: value } }
                : s
            ),
          };
        }),
      }));
    },
    [editor.currentPageId, mutateDesign]
  );

  const removeSection = useCallback(
    (sectionId: string) => {
      if (!editor.currentPageId) return;
      mutateDesign((d) => ({
        ...d,
        pages: d.pages.map((p) => {
          if (p.id !== editor.currentPageId) return p;
          return {
            ...p,
            sections: p.sections.filter((s) => s.id !== sectionId),
          };
        }),
      }));
      setEditor((e) => ({
        ...e,
        selectedSectionId:
          e.selectedSectionId === sectionId ? null : e.selectedSectionId,
      }));
    },
    [editor.currentPageId, mutateDesign]
  );

  const duplicateSection = useCallback(
    (sectionId: string) => {
      if (!editor.currentPageId) return;
      mutateDesign((d) => ({
        ...d,
        pages: d.pages.map((p) => {
          if (p.id !== editor.currentPageId) return p;
          const idx = p.sections.findIndex((s) => s.id === sectionId);
          if (idx === -1) return p;
          const original = p.sections[idx];
          const clone: SectionInstance = {
            ...structuredClone(original),
            id: generateId("sec"),
          };
          const sections = [...p.sections];
          sections.splice(idx + 1, 0, clone);
          return { ...p, sections };
        }),
      }));
    },
    [editor.currentPageId, mutateDesign]
  );

  const toggleSectionVisibility = useCallback(
    (sectionId: string) => {
      if (!editor.currentPageId) return;
      mutateDesign((d) => ({
        ...d,
        pages: d.pages.map((p) => {
          if (p.id !== editor.currentPageId) return p;
          return {
            ...p,
            sections: p.sections.map((s) =>
              s.id === sectionId ? { ...s, isVisible: !s.isVisible } : s
            ),
          };
        }),
      }));
    },
    [editor.currentPageId, mutateDesign]
  );

  const moveSection = useCallback(
    (sectionId: string, direction: "up" | "down") => {
      if (!editor.currentPageId) return;
      mutateDesign((d) => ({
        ...d,
        pages: d.pages.map((p) => {
          if (p.id !== editor.currentPageId) return p;
          const sections = [...p.sections];
          const idx = sections.findIndex((s) => s.id === sectionId);
          if (idx === -1) return p;
          const targetIdx = direction === "up" ? idx - 1 : idx + 1;
          if (targetIdx < 0 || targetIdx >= sections.length) return p;
          [sections[idx], sections[targetIdx]] = [
            sections[targetIdx],
            sections[idx],
          ];
          return { ...p, sections };
        }),
      }));
    },
    [editor.currentPageId, mutateDesign]
  );

  // ── Theme operations ──────────────────────────────────

  const updateTheme = useCallback(
    (updates: Partial<ThemeConfig>) => {
      mutateDesign((d) => ({
        ...d,
        theme: { ...d.theme, ...updates },
      }));
    },
    [mutateDesign]
  );

  const updateThemeColor = useCallback(
    (key: keyof ThemeConfig["colors"], value: string) => {
      mutateDesign((d) => ({
        ...d,
        theme: {
          ...d.theme,
          colors: { ...d.theme.colors, [key]: value },
        },
      }));
    },
    [mutateDesign]
  );

  const updateThemeTypography = useCallback(
    (key: keyof ThemeConfig["typography"], value: string) => {
      mutateDesign((d) => ({
        ...d,
        theme: {
          ...d.theme,
          typography: { ...d.theme.typography, [key]: value },
        },
      }));
    },
    [mutateDesign]
  );

  const updateThemeButtons = useCallback(
    (updates: Partial<ThemeConfig["buttons"]>) => {
      mutateDesign((d) => ({
        ...d,
        theme: {
          ...d.theme,
          buttons: { ...d.theme.buttons, ...updates },
        },
      }));
    },
    [mutateDesign]
  );

  const setDevice = useCallback((device: DeviceMode) => {
    setEditor((e) => ({ ...e, device }));
  }, []);

  const setSidebarTab = useCallback((sidebarTab: EditorState["sidebarTab"]) => {
    setEditor((e) => ({ ...e, sidebarTab }));
  }, []);

  const setInspectorTab = useCallback((inspectorTab: EditorState["inspectorTab"]) => {
    setEditor((e) => ({ ...e, inspectorTab }));
  }, []);

  const setShowAddSectionModal = useCallback((showAddSectionModal: boolean) => {
    setEditor((e) => ({ ...e, showAddSectionModal }));
  }, []);

  const setShowTemplatePickerModal = useCallback((showTemplatePickerModal: boolean) => {
    setEditor((e) => ({ ...e, showTemplatePickerModal }));
  }, []);

  // *  // ── API: Load ─────────────────────────────────────────

  const load = useCallback(async () => {
    try {
      const token = localStorage.getItem("kiln.auth.token");
      if (!token) {
        setIsLoaded(true);
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const websiteId = params.get("websiteId") || "default";
      const presetId = params.get("preset");

      const sdk = new PlatformSDK();

      let designToLoad: DesignState | null = null;

      try {
        const d = await sdk.loadWebsite(websiteId);
        if (d) {
          designToLoad = d;
        }
      } catch (err) {
        console.warn("Remote design load failed, trying preset fallback:", err);
      }

      if (designToLoad) {
        setDesign(designToLoad);
        if (designToLoad.pages.length > 0) {
          setEditor((e) => ({
            ...e,
            currentPageId: designToLoad.pages[0].id,
            showTemplatePickerModal: false,
          }));
        }
        setIsLoaded(true);
        return;
      }

      // Try to load from preset ID or use default template
      let templateToUse = null;
      
      if (presetId) {
        templateToUse = getTemplates().find((t) => t.id === presetId);
      }
      
      // Fallback to first/default template if no preset specified or not found
      if (!templateToUse) {
        templateToUse = getTemplates()[0];
      }

      if (templateToUse) {
        const ds = templateToDesignState(templateToUse);
        let newDesign = ds;

        try {
          const created = await sdk.createWebsiteDesign(
            websiteId,
            templateToUse.id,
            ds.theme,
            ds.pages
          );
          if (created) {
            newDesign = created;
          }
        } catch (err) {
          console.warn("Backend unavailable, using local preset design:", err);
        }

        setDesign(newDesign);
        setEditor((e) => ({
          ...e,
          currentPageId: newDesign.pages[0]?.id ?? "",
          showTemplatePickerModal: false,
        }));
        setIsLoaded(true);
        return;
      }

      // Should rarely happen, but fallback to template picker if no templates exist
      setEditor((e) => ({ ...e, showTemplatePickerModal: true }));
      setIsLoaded(true);
    } catch (err) {
      console.error("Failed to load design:", err);
      setEditor((e) => ({ ...e, showTemplatePickerModal: true }));
      setIsLoaded(true);
    }
  }, []);

  // ── API: Save ─────────────────────────────────────────

  const save = useCallback(async () => {
    try {
      setEditor((e) => ({ ...e, isSaving: true }));
      const params = new URLSearchParams(window.location.search);
      const websiteId = params.get("websiteId") || "default";

      const sdk = new PlatformSDK();
      const success = await sdk.saveWebsite(websiteId, design);
      if (!success) throw new Error("Save failed");
      
      const manager = new WebsiteManager();
      manager.editLayout(design.templateId || "site", editor.currentPageId, design.pages);
      console.log("[Platform Engine Integration] WebsiteManager.editLayout tracked draft state changes!");
      setEditor((e) => ({
        ...e,
        isDirty: false,
        isSaving: false,
        lastSaved: new Date(),
      }));
    } catch (err) {
      console.error("Save error:", err);
      setEditor((e) => ({ ...e, isSaving: false }));
    }
  }, [design, editor.currentPageId]);

  // ── API: Create from template ─────────────────────────

  const createFromTemplate = useCallback(
    async (templateDesign: DesignState) => {
      try {
        const token = localStorage.getItem("kiln.auth.token");
        if (!token) return;
        const params = new URLSearchParams(window.location.search);
        const websiteId = params.get("websiteId") || "default";

        const sdk = new PlatformSDK();
        const d = await sdk.createWebsiteDesign(
          websiteId,
          templateDesign.templateId,
          templateDesign.theme,
          templateDesign.pages
        );

        const cloner = new WebsiteClone();
        const cloneId = cloner.cloneWebsiteInstance(templateDesign.templateId || "template");
        console.log("[Platform Engine Integration] WebsiteClone cloned template instance:", cloneId);
        
        setDesign(d);
        setEditor((e) => ({
          ...e,
          currentPageId: d.pages[0]?.id || "",
          showTemplatePickerModal: false,
          isDirty: false,
        }));
        setIsLoaded(true);
      } catch (err) {
        console.error("Create error:", err);
      }
    },
    []
  );


  // ── API: Publish ──────────────────────────────────────

  const publish = useCallback(async () => {
    try {
      const token = localStorage.getItem("kiln.auth.token");
      if (!token) return;
      // Save first
      await save();

      const params = new URLSearchParams(window.location.search);
      const websiteId = params.get("websiteId") || "default";

      const sdk = new PlatformSDK();
      const data = await sdk.publish(websiteId);

      setDesign((d) => ({
        ...d,
        publishedAt: data.publishedAt,
        version: data.version,
      }));
      return true;
    } catch (err) {
      console.error("Publish error:", err);
      return false;
    }
  }, [save]);

  // ── Auto-save (debounced 3s) ──────────────────────────

  useEffect(() => {
    if (!editor.isDirty || !isLoaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      save();
    }, 3000);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [editor.isDirty, design, isLoaded, save]);

  // ── Return ────────────────────────────────────────────

  return {
    // State
    design,
    editor,
    isLoaded,
    currentPage,
    selectedSection,

    // History
    undo,
    redo,
    canUndo,
    canRedo,

    // Pages
    setCurrentPage,
    updatePage,

    // Sections
    selectSection,
    addSection,
    updateSectionConfig,
    removeSection,
    duplicateSection,
    toggleSectionVisibility,
    moveSection,

    // Theme
    updateTheme,
    updateThemeColor,
    updateThemeTypography,
    updateThemeButtons,

    // Editor UI
    setDevice,
    setSidebarTab,
    setInspectorTab,
    setShowAddSectionModal,
    setShowTemplatePickerModal,

    // API
    load,
    save,
    publish,
    createFromTemplate,
  };
}

export type DesignEngine = ReturnType<typeof useDesignEngine>;
