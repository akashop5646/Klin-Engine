export const EVENTS = {
  COMPONENT: {
    REGISTERED: "component:registered",
    UPDATED: "component:updated",
    UNREGISTERED: "component:unregistered",
  },
  BLOCK: {
    REGISTERED: "block:registered",
    UPDATED: "block:updated",
  },
  EDITOR: {
    SELECTION_CHANGED: "editor:selection-changed",
    STATE_SAVED: "editor:state-saved",
    HISTORY_PUSHED: "editor:history-pushed",
    UNDO: "editor:undo",
    REDO: "editor:redo",
  },
  THEME: {
    CHANGED: "theme:changed",
  },
} as const;
