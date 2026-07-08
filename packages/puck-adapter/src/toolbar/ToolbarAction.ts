export interface ToolbarAction {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  execute: () => void;
  enabled?: boolean;
}
