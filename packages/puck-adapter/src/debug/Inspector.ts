import { EditorState } from "../state/EditorState";
import { MetricsCollector } from "../metrics/MetricsCollector";

export class Inspector {
  private editorState: EditorState;
  private metrics: MetricsCollector;

  constructor(editorState: EditorState, metrics: MetricsCollector) {
    this.editorState = editorState;
    this.metrics = metrics;
  }

  dumpState(): any {
    return {
      editor: this.editorState.getState(),
      counter: {
        selections: this.metrics.getCounter("selection.updates"),
        renders: this.metrics.getCounter("canvas.renders"),
      },
    };
  }
}
