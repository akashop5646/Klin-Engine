export class JsonViewer {
  public prettyPrint(data: any): string {
    return JSON.stringify(data, null, 2);
  }

  public highlight(json: string): string {
    // Returns syntax-highlighted JSON for terminal output
    return json
      .replace(/"([^"]+)":/g, "\x1b[36m\"$1\":\x1b[0m")
      .replace(/: "([^"]+)"/g, ": \x1b[33m\"$1\"\x1b[0m");
  }
}
