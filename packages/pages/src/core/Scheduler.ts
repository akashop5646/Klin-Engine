import type { PageDefinition } from "./PageDefinition";

export class Scheduler {
  shouldBeActive(definition: PageDefinition, timestamp: number = Date.now()): boolean {
    const rules = definition.scheduling;
    if (!rules) return true;

    // 1. Check publish scheduling
    if (rules.publishAt && timestamp < rules.publishAt) {
      return false;
    }

    // 2. Check unpublish scheduling
    if (rules.unpublishAt && timestamp >= rules.unpublishAt) {
      return false;
    }

    // 3. Check expire scheduling
    if (rules.expireAt && timestamp >= rules.expireAt) {
      return false;
    }

    // 4. Check archive scheduling
    if (rules.archiveAt && timestamp >= rules.archiveAt) {
      return false;
    }

    return true;
  }

  isExpired(definition: PageDefinition, timestamp: number = Date.now()): boolean {
    const rules = definition.scheduling;
    if (!rules) return false;

    if (rules.expireAt && timestamp >= rules.expireAt) {
      return true;
    }
    return false;
  }
}
