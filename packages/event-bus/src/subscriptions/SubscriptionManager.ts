import { Subscription } from "./Subscription";
import { KlinEvent } from "../events/KlinEvent";

export class SubscriptionManager {
  private subscriptions = new Map<string, Subscription>();

  add(sub: Subscription) {
    this.subscriptions.set(sub.id, sub);
  }

  remove(id: string) {
    this.subscriptions.delete(id);
  }

  clear() {
    this.subscriptions.clear();
  }

  pauseGroup(group: string) {
    for (const sub of this.subscriptions.values()) {
      if (sub.group === group) {
        sub.paused = true;
      }
    }
  }

  resumeGroup(group: string) {
    for (const sub of this.subscriptions.values()) {
      if (sub.group === group) {
        sub.paused = false;
      }
    }
  }

  getSubscribersForEvent(event: KlinEvent): Subscription[] {
    const list: Subscription[] = [];
    for (const sub of this.subscriptions.values()) {
      if (sub.paused) continue;
      
      const matched = this.matchPattern(event.name, sub.eventNamePattern);
      if (!matched) continue;

      if (sub.filter && !sub.filter(event)) continue;

      list.push(sub);
    }
    return list;
  }

  private matchPattern(name: string, pattern: string): boolean {
    if (pattern === "*") return true;
    if (pattern.endsWith(".*")) {
      const prefix = pattern.slice(0, -2);
      return name.startsWith(prefix + ".");
    }
    return name === pattern;
  }
}
