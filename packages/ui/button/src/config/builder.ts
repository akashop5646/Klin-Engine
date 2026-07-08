/**
 * Button Builder Metadata — extra information the Builder needs to render
 * this component in the palette, drag-drop, and property editor.
 * Puck adapter consumes this directly.
 */

export const buttonBuilderConfig = {
  /** Group in the builder component palette */
  group: "Actions",

  /** Display order within the group */
  order: 1,

  /** Palette settings */
  palette: {
    label: "Button",
    icon: "mouse-pointer-click",
    description: "Clickable action button",
  },

  /** Search keywords for the builder palette search */
  searchKeywords: [
    "button", "btn", "action", "click", "submit",
    "link", "cta", "call to action",
  ],

  /** Default size when dropped into the canvas */
  defaultSize: { width: "auto", height: "auto" },

  /** Drag preview configuration */
  dragPreview: {
    showLabel: true,
    showIcon: true,
  },

  /** Drop zones this component provides (none for atomic button) */
  dropZones: [],

  /** Allowed parent components (empty = any) */
  allowedParents: [],

  /** Allowed child components (empty = none for button) */
  allowedChildren: [],

  /** Whether this component supports nesting other components */
  supportsNesting: false,
};
