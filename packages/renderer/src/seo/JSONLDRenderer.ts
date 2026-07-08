export class JSONLDRenderer {
  public renderSchema(schemaObject: Record<string, any>): string {
    return `<script type="application/ld+json">${JSON.stringify(schemaObject)}</script>`;
  }
}
