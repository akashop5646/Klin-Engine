import { BuilderPlugin } from "./BuilderPlugin";

export interface BuilderExtension {
  id: string;
  name: string;
  description?: string;
  plugins: BuilderPlugin[];
}
