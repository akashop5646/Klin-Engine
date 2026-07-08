// ─── Product Definition ────────────────────────────────────

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  status: "active" | "draft" | "archived";
  inventory: number;
  sku: string;
}

// ─── Theme Configuration ───────────────────────────────────

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  headingSize: "small" | "default" | "large";
  bodySize: "small" | "default" | "large";
}

export interface ThemeButtons {
  style: "rounded" | "square" | "pill";
  shadow: boolean;
}

export interface ThemeCards {
  radius: number;
  shadow: boolean;
  border: boolean;
}

export type AnimationPreset =
  | "none"
  | "fade"
  | "slide"
  | "scale"
  | "luxury"
  | "modern";

export interface ThemeConfig {
  colors: ThemeColors;
  typography: ThemeTypography;
  buttons: ThemeButtons;
  cards: ThemeCards;
  animations: AnimationPreset;
}

// ─── Sections ──────────────────────────────────────────────

export type SectionType =
  | "header"
  | "hero"
  | "featured-products"
  | "rich-text"
  | "image-banner"
  | "gallery"
  | "features"
  | "testimonials"
  | "newsletter"
  | "faq"
  | "announcement"
  | "footer";

export interface SectionInstance {
  id: string;
  type: SectionType;
  isVisible: boolean;
  config: Record<string, any>;
}

// ─── Pages ─────────────────────────────────────────────────

export interface PageConfig {
  id: string;
  title: string;
  slug: string;
  isVisible: boolean;
  sections: SectionInstance[];
}

// ─── Design State (full working state) ─────────────────────

export interface DesignState {
  _id?: string;
  templateId: string;
  theme: ThemeConfig;
  pages: PageConfig[];
  version: number;
  publishedAt: string | null;
}

// ─── Editor-only State (not persisted) ─────────────────────

export type DeviceMode = "desktop" | "tablet" | "mobile";

export interface EditorState {
  currentPageId: string;
  selectedSectionId: string | null;
  device: DeviceMode;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  showAddSectionModal: boolean;
  showTemplatePickerModal: boolean;
  sidebarTab: "pages" | "sections" | "theme";
  inspectorTab: "content" | "style" | "layout";
}

// ─── Section Registry ──────────────────────────────────────

export interface SectionDefinition {
  type: SectionType;
  label: string;
  category: "navigation" | "hero" | "commerce" | "content" | "social" | "marketing";
  icon: string; // Lucide icon name
  description: string;
  defaultConfig: Record<string, any>;
  inspectorFields: InspectorField[];
}

export interface InspectorField {
  key: string;
  label: string;
  type: "text" | "textarea" | "color" | "image" | "select" | "toggle" | "number" | "link" | "items";
  tab: "content" | "style" | "layout";
  options?: { label: string; value: string }[];
  placeholder?: string;
  group?: string;
}

// ─── postMessage Protocol ──────────────────────────────────

export interface PreviewMessage {
  type: "UPDATE_DESIGN";
  design: DesignState;
  currentPageId: string;
}

export interface PreviewClickMessage {
  type: "SECTION_CLICKED";
  sectionId: string;
}

// ─── API Responses ─────────────────────────────────────────

export interface StoreDesignResponse {
  design: DesignState;
}

export interface PublishResponse {
  message: string;
  publishedAt: string;
  version: number;
}

// ─── Template ──────────────────────────────────────────────

export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  theme: ThemeConfig;
  pages: PageConfig[];
}
