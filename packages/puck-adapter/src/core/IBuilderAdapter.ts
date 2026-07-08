import { Result } from "@klin/core";
import { BuilderContext } from "./BuilderContext";
import { EditorState } from "../state/EditorState";

// Core builder adapter contract definition

export interface IBuilderAdapter {
  initialize(context: BuilderContext): Promise<Result<void, Error>>;
  load(): Promise<Result<void, Error>>;
  registerExtension(extension: any): Promise<Result<void, Error>>;
  updateState(state: Partial<EditorState>): void;
  dispose(): Promise<void>;
}
