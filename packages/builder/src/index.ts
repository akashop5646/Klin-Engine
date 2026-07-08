// Core Exports
export { BuilderLifecycle } from "./core/BuilderLifecycle";
export type { BuilderState } from "./core/BuilderLifecycle";
export { Preferences } from "./core/Preferences";
export type { PreferenceSettings } from "./core/Preferences";
export { BreakpointManager } from "./core/BreakpointManager";
export type { BreakpointDevice, Breakpoint } from "./core/BreakpointManager";
export { BuilderContext } from "./core/BuilderContext";
export type { BuilderContextConfig } from "./core/BuilderContext";
export { BuilderEngine } from "./core/BuilderEngine";
export { BuilderManager } from "./core/BuilderManager";

// Canvas & Figma Layouts
export { Canvas } from "./canvas/Canvas";
export type { CanvasConfig } from "./canvas/Canvas";
export { CanvasRenderer } from "./canvas/CanvasRenderer";
export { CanvasSelection } from "./canvas/CanvasSelection";
export { DropZone } from "./canvas/DropZone";
export { DragManager } from "./canvas/DragManager";
export { GridOverlay } from "./canvas/GridOverlay";
export { AlignmentEngine } from "./canvas/AlignmentEngine";
export { AutoLayout } from "./canvas/AutoLayout";
export type { AutoLayoutDirection, AutoLayoutConfig } from "./canvas/AutoLayout";
export { Constraints } from "./canvas/Constraints";
export type { HorizontalConstraint, VerticalConstraint, ElementConstraints } from "./canvas/Constraints";
export { ConstraintResolver } from "./canvas/ConstraintResolver";

// Blueprints & Globals
export { ComponentBlueprint } from "./components/ComponentBlueprint";
export type { BlueprintNode } from "./components/ComponentBlueprint";
export { ComponentManager } from "./components/ComponentManager";
export { ReusableComponent } from "./components/ReusableComponent";
export { ComponentInstance } from "./components/ComponentInstance";
export { GlobalComponentManager } from "./global/GlobalComponentManager";
export { GlobalComponentReference } from "./global/GlobalComponentReference";

// Sections & Page Templates
export { SectionTemplate } from "./sections/SectionTemplate";
export { SectionLibrary } from "./sections/SectionLibrary";
export { PageTemplate } from "./page-templates/PageTemplate";
export { PageTemplateLibrary } from "./page-templates/PageTemplateLibrary";
export { LayoutPreset } from "./page-templates/LayoutPreset";

// Explorers & Navigation
export { WebsiteExplorer } from "./structure/WebsiteExplorer";
export { PageExplorer } from "./structure/PageExplorer";
export { NavigationEditor } from "./structure/NavigationEditor";
export type { NavigationLink } from "./structure/NavigationEditor";
export { RouteEditor } from "./structure/RouteEditor";
export { SitemapExplorer } from "./structure/SitemapExplorer";

// Layers Panel
export { LayerTree } from "./layers/LayerTree";
export type { LayerNode } from "./layers/LayerTree";
export { LayerSelection } from "./layers/LayerSelection";
export { LayerOperations } from "./layers/LayerOperations";

// Inspector & Variables
export { Inspector } from "./inspector/Inspector";
export { PropertyEditor } from "./inspector/PropertyEditor";
export { StyleInspector } from "./inspector/StyleInspector";
export { ClassManager } from "./inspector/ClassManager";
export { AnimationInspector } from "./inspector/AnimationInspector";
export type { BasicAnimationConfig } from "./inspector/AnimationInspector";
export { Timeline } from "./inspector/Timeline";
export type { TimelineKeyframe } from "./inspector/Timeline";
export { TimelineEditor } from "./inspector/TimelineEditor";
export { ResponsiveInspector } from "./inspector/ResponsiveInspector";
export { BindingInspector } from "./inspector/BindingInspector";
export { VisibilityInspector } from "./inspector/VisibilityInspector";
export { VariableManager } from "./variables/VariableManager";
export { ExpressionEngine } from "./variables/ExpressionEngine";
export { ConditionEngine } from "./variables/ConditionEngine";
export { StateManager } from "./variables/StateManager";

// Library & Themes
export { BlockLibrary } from "./library/BlockLibrary";
export type { BlockMeta } from "./library/BlockLibrary";
export { CategoryManager } from "./library/CategoryManager";
export { BlockSearch } from "./library/BlockSearch";
export { Favorites } from "./library/Favorites";
export { RecentlyUsed } from "./library/RecentlyUsed";
export { IconLibrary } from "./library/IconLibrary";
export { ThemePreset } from "./theme/ThemePreset";
export type { PresetTokens } from "./theme/ThemePreset";
export { VariantManager } from "./theme/VariantManager";
export { ThemeVariables } from "./theme/ThemeVariables";
export { FontManager } from "./theme/FontManager";
export { ColorPalette } from "./theme/ColorPalette";
export { ThemeEditor } from "./theme/ThemeEditor";

// Media Assets
export { AssetBrowser } from "./assets/AssetBrowser";
export type { MediaAsset } from "./assets/AssetBrowser";
export { UploadManager } from "./assets/UploadManager";
export { FolderManager } from "./assets/FolderManager";
export { AssetPicker } from "./assets/AssetPicker";
export { ImageEditor } from "./assets/ImageEditor";
export type { ImageEditPayload } from "./assets/ImageEditor";

// CMS Panels
export { CollectionPanel } from "./data/CollectionPanel";
export { EntryEditor } from "./data/EntryEditor";
export { DynamicBindingPanel } from "./data/DynamicBindingPanel";
export { LivePreviewSync } from "./data/LivePreviewSync";

// Toolbar & Shortcuts
export { BuilderToolbar } from "./toolbar/BuilderToolbar";
export { DeviceSwitcher } from "./toolbar/DeviceSwitcher";
export { ZoomManager } from "./toolbar/ZoomManager";
export { PreviewManager } from "./toolbar/PreviewManager";
export { ShortcutManager } from "./shortcuts/ShortcutManager";
export { CommandPalette } from "./shortcuts/CommandPalette";
export type { PaletteAction } from "./shortcuts/CommandPalette";
export { ClipboardManager } from "./shortcuts/ClipboardManager";

// History, Versions & Protection
export { HistoryManager } from "./history/HistoryManager";
export { CommandManager } from "./history/CommandManager";
export type { ICommand } from "./history/CommandManager";
export { ChangeTracker } from "./history/ChangeTracker";
export { VersionManager } from "./versions/VersionManager";
export type { SiteVersion } from "./versions/VersionManager";
export { ProtectionManager } from "./protection/ProtectionManager";
export type { LockLevel } from "./protection/ProtectionManager";

// Collaboration
export { PresenceManager } from "./collaboration/PresenceManager";
export type { UserPresence } from "./collaboration/PresenceManager";
export { CursorManager } from "./collaboration/CursorManager";
export type { CursorCoordinates } from "./collaboration/CursorManager";
export { CommentSystem } from "./collaboration/CommentSystem";
export type { BlockComment } from "./collaboration/CommentSystem";
export { LockOverlay } from "./collaboration/LockOverlay";

// Publishing
export { PublishManager } from "./publishing/PublishManager";
export { PublishPreview } from "./publishing/PublishPreview";
export { PublishValidator } from "./publishing/PublishValidator";
export type { ValidationResult } from "./publishing/PublishValidator";

// AI & Converter
export { PromptBuilder } from "./ai/PromptBuilder";
export { SelectionContext } from "./ai/SelectionContext";
export { BuilderHints } from "./ai/BuilderHints";
export { AIAction } from "./ai/AIAction";
export type { AISuggestedEdit } from "./ai/AIAction";
export { ConverterMetadata } from "./converter/ConverterMetadata";
export type { BlockConversionMap } from "./converter/ConverterMetadata";

// Plugins, Extensions & Marketplace
export { Plugin } from "./plugins/Plugin";
export type { PluginManifest } from "./plugins/Plugin";
export { PluginManager } from "./plugins/PluginManager";
export { PluginRegistry } from "./plugins/PluginRegistry";
export { PluginSandbox } from "./plugins/PluginSandbox";
export { Extension } from "./extensions/Extension";
export type { ExtensionConfig } from "./extensions/Extension";
export { ExtensionManager } from "./extensions/ExtensionManager";
export { ExtensionContext } from "./extensions/ExtensionContext";
export { Marketplace } from "./marketplace/Marketplace";
export { MarketplaceItem } from "./marketplace/MarketplaceItem";
export type { MarketplaceType } from "./marketplace/MarketplaceItem";
export { MarketplaceInstaller } from "./marketplace/MarketplaceInstaller";

// Inspectors & Diagnostics
export { MetricsCollector } from "./diagnostics/MetricsCollector";
export { Inspector as DiagnosticsInspector } from "./diagnostics/Inspector";
export { AccessibilityInspector } from "./diagnostics/AccessibilityInspector";
export type { AccessibilityIssue } from "./diagnostics/AccessibilityInspector";
export { SEOInspector } from "./diagnostics/SEOInspector";
export type { SEOIssue } from "./diagnostics/SEOInspector";
export { PerformanceInspector } from "./diagnostics/PerformanceInspector";
export type { PerformanceScore } from "./diagnostics/PerformanceInspector";

// Serialization
export { BuilderSerializer } from "./serialization/BuilderSerializer";
export { BuilderDeserializer } from "./serialization/BuilderDeserializer";
