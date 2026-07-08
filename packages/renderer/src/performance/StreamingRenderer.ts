export class StreamingRenderer {
  public async *streamRender(blocks: any[]): AsyncGenerator<string, void, unknown> {
    for (const block of blocks) {
      yield `<div data-block-id="${block.id}">HTML Chunk</div>`;
    }
  }
}
