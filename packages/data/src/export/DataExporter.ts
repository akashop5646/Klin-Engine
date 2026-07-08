import { Entry } from "../entities/Entry";

export class DataExporter {
  public static exportToJSON(entries: Entry[]): string {
    const list = entries.map((e) => ({
      id: e.id,
      collectionName: e.collectionName,
      status: e.status,
      values: e.values,
      localizations: e.localizations,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
    return JSON.stringify(list, null, 2);
  }

  public static exportToCSV(entries: Entry[]): string {
    if (entries.length === 0) return "";
    
    // Find all value keys
    const keysSet: Set<string> = new Set(["id", "status"]);
    entries.forEach((e) => {
      Object.keys(e.values).forEach((k) => keysSet.add(k));
    });
    
    const headers = Array.from(keysSet);
    const rows = [headers.join(",")];

    entries.forEach((e) => {
      const rowVals = headers.map((header) => {
        let val = e.values[header] ?? (e as any)[header] ?? "";
        // Escape commas
        if (typeof val === "string" && val.includes(",")) {
          val = `"${val}"`;
        }
        return val;
      });
      rows.push(rowVals.join(","));
    });

    return rows.join("\n");
  }
}
