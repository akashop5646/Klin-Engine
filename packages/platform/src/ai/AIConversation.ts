export interface AIConversationMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export class AIConversation {
  private _messages: AIConversationMessage[] = [];

  public addMessage(role: "user" | "assistant" | "system", content: string): void {
    this._messages.push({ role, content });
  }

  public get messages(): AIConversationMessage[] {
    return this._messages;
  }
}
