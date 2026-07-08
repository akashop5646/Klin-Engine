export class StreamingSSR {
  public async *streamPageOutput(pageTree: any): AsyncGenerator<string, void, unknown> {
    yield `<!DOCTYPE html><html><head></head><body>`;
    yield `<div id="klin-streaming-root">`;
    yield `</div></body></html>`;
  }
}
