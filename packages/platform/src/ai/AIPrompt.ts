export class AIPrompt {
  public rawPrompt: string;
  public processedPrompt: string;
  public temperature: number = 0.7;

  constructor(rawPrompt: string, processedPrompt: string) {
    this.rawPrompt = rawPrompt;
    this.processedPrompt = processedPrompt;
  }
}
