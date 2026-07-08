export class PromptBuilder {
  public compileSystemPrompt(editorState: any): string {
    return `You are editing a website layout. Currently active tree: ${JSON.stringify(editorState)}`;
  }
}
