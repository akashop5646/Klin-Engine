export class DropCalculator {
  static calculateIndex(
    clientY: number,
    sectionRects: Array<{ id: string; top: number; bottom: number }>
  ): { index: number; relativePosition: "before" | "after" | "inside"; targetId: string | null } {
    if (sectionRects.length === 0) {
      return { index: 0, relativePosition: "inside", targetId: null };
    }

    for (let i = 0; i < sectionRects.length; i++) {
      const rect = sectionRects[i];
      const middle = rect.top + (rect.bottom - rect.top) / 2;
      
      if (clientY < middle) {
        return { index: i, relativePosition: "before", targetId: rect.id };
      }
    }

    return {
      index: sectionRects.length,
      relativePosition: "after",
      targetId: sectionRects[sectionRects.length - 1].id,
    };
  }
}
