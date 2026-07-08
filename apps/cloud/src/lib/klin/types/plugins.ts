import { KlinRegistryEntry } from "./core";

export interface KlinPlugin {
  id: string;
  name: string;
  version: string;
  onInit?: (context: any) => void;
  onDestroy?: () => void;
  hooks?: {
    beforeRender?: (data: any) => any;
    afterRender?: (html: string) => string;
    onStateChange?: (state: any) => void;
  };
}

export interface PluginRegistry {
  plugins: Record<string, KlinPlugin>;
  register: (plugin: KlinPlugin) => void;
  unregister: (id: string) => void;
}
