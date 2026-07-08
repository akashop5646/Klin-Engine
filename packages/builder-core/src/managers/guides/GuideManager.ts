import { BuilderStore } from "../../state/BuilderStore";

export class GuideManager {
  private store: BuilderStore;

  constructor(store: BuilderStore) {
    this.store = store;
  }

  calculateSnaps(
    activeElementRect: { x: number; y: number; width: number; height: number },
    siblingRects: Array<{ id: string; x: number; y: number; width: number; height: number }>,
    threshold: number = 8
  ): { snapX: number | null; snapY: number | null } {
    let snapX: number | null = null;
    let snapY: number | null = null;

    const activeCenterX = activeElementRect.x + activeElementRect.width / 2;
    const activeCenterY = activeElementRect.y + activeElementRect.height / 2;

    const snaplines: any[] = [];

    for (const sib of siblingRects) {
      const sibCenterX = sib.x + sib.width / 2;
      const sibCenterY = sib.y + sib.height / 2;

      // Check X coordinate snaps (vertical snap line)
      if (Math.abs(activeElementRect.x - sib.x) < threshold) {
        snapX = sib.x;
        snaplines.push({ type: "vertical", value: sib.x });
      } else if (Math.abs((activeElementRect.x + activeElementRect.width) - (sib.x + sib.width)) < threshold) {
        snapX = sib.x + sib.width - activeElementRect.width;
        snaplines.push({ type: "vertical", value: sib.x + sib.width });
      } else if (Math.abs(activeCenterX - sibCenterX) < threshold) {
        snapX = sibCenterX - activeElementRect.width / 2;
        snaplines.push({ type: "vertical", value: sibCenterX });
      }

      // Check Y coordinate snaps (horizontal snap line)
      if (Math.abs(activeElementRect.y - sib.y) < threshold) {
        snapY = sib.y;
        snaplines.push({ type: "horizontal", value: sib.y });
      } else if (Math.abs((activeElementRect.y + activeElementRect.height) - (sib.y + sib.height)) < threshold) {
        snapY = sib.y + sib.height - activeElementRect.height;
        snaplines.push({ type: "horizontal", value: sib.y + sib.height });
      } else if (Math.abs(activeCenterY - sibCenterY) < threshold) {
        snapY = sibCenterY - activeElementRect.height / 2;
        snaplines.push({ type: "horizontal", value: sibCenterY });
      }
    }

    if (snaplines.length > 0) {
      this.store.update({ snaplines });
    } else {
      this.store.update({ snaplines: [] });
    }

    return { snapX, snapY };
  }

  clearSnaps() {
    this.store.update({ snaplines: [] });
  }
}
