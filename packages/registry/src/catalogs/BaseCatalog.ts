export interface CatalogItem {
  id: string;
  version: string;
  name: string;
  [key: string]: any;
}

export class BaseCatalog<T extends CatalogItem> {
  protected items = new Map<string, Map<string, T>>();

  register(item: T) {
    if (!this.items.has(item.id)) {
      this.items.set(item.id, new Map());
    }
    this.items.get(item.id)!.set(item.version, item);
  }

  unregister(id: string, version?: string) {
    if (version) {
      this.items.get(id)?.delete(version);
      if (this.items.get(id)?.size === 0) {
        this.items.delete(id);
      }
    } else {
      this.items.delete(id);
    }
  }

  replace(item: T) {
    this.register(item);
  }

  findById(id: string): T | undefined {
    const versions = this.items.get(id);
    if (!versions || versions.size === 0) return undefined;
    const sorted = Array.from(versions.keys()).sort();
    return versions.get(sorted[sorted.length - 1]);
  }

  findVersion(id: string, version: string): T | undefined {
    return this.items.get(id)?.get(version);
  }

  has(id: string, version?: string): boolean {
    if (version) {
      return !!this.items.get(id)?.has(version);
    }
    return this.items.has(id);
  }

  list(): T[] {
    const all: T[] = [];
    for (const versions of this.items.values()) {
      all.push(...versions.values());
    }
    return all;
  }

  count(): number {
    let sum = 0;
    for (const versions of this.items.values()) {
      sum += versions.size;
    }
    return sum;
  }

  clear() {
    this.items.clear();
  }
}
