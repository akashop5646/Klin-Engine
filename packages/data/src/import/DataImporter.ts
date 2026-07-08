import { Entry } from "../entities/Entry";

export class DataImporter {
  public static importFromJSON(collectionName: string, jsonStr: string): Entry[] {
    const raw = JSON.parse(jsonStr);
    const list = Array.isArray(raw) ? raw : [raw];
    return list.map((item: any) => {
      return new Entry({
        id: item.id || Math.random().toString(36).substring(2, 9),
        collectionName,
        status: item.status || "Draft",
        values: item.values || item,
        localizations: item.localizations || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }

  public static importFromCSV(collectionName: string, csvStr: string): Entry[] {
    const lines = csvStr.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length < 2) return [];

    const headers = lines[0].split(",");
    const entries: Entry[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",");
      const values: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        let val: any = cols[index] || "";
        // Basic type conversions for numbers/booleans
        if (val === "true") val = true;
        else if (val === "false") val = false;
        else if (!isNaN(Number(val)) && val !== "") val = Number(val);
        
        values[header] = val;
      });

      entries.push(
        new Entry({
          id: values.id || Math.random().toString(36).substring(2, 9),
          collectionName,
          status: "Draft",
          values,
          localizations: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
    }

    return entries;
  }
}
