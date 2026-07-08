export class SelectionContext {
  public captureContext(selectedBlockId: string, nodeProps: Record<string, any>): Record<string, any> {
    return {
      id: selectedBlockId,
      props: nodeProps,
      exportedAt: Date.now(),
    };
  }
}
