import { BuilderAPI } from "./BuilderAPI";

export interface BuilderPlugin {
  name: string;
  version: string;
  setup(api: BuilderAPI): void | Promise<void>;
  teardown?(api: BuilderAPI): void | Promise<void>;
}
